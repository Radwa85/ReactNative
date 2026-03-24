import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
}

interface TasksState {
  currentListId: string | null;
  taskLists: any[]; // holds all dynamic lists
  tasks: Task[];
  allTasks: Task[]; // Aggregated tasks across all lists
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TasksState = {
  currentListId: null,
  taskLists: [],
  tasks: [],
  allTasks: [],
  status: 'idle',
  error: null,
};

// Async Thunks
export const initializeTaskList = createAsyncThunk('tasks/initializeList', async (_, { dispatch }) => {
  let listsResponse = await api.get('/task-lists');
  let lists = listsResponse.data.data || [];
  
  if (lists.length === 0) {
    let createRes = await api.post('/task-lists/create-task-list', { title: 'Tasks', description: 'Default Task List' });
    lists = [createRes.data.data];
  }
  
  const defaultListId = lists[0].id;
  dispatch(fetchTasks(defaultListId));
  return { defaultListId, lists };
});

export const createTaskList = createAsyncThunk('tasks/createTaskList', async (title: string) => {
  const response = await api.post('/task-lists/create-task-list', { title, description: '' });
  return response.data.data;
});

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (taskListId: string) => {
  const response = await api.get(`/tasks/list-tasks?task_list_id=${taskListId}`);
  return response.data.data || []; 
});

export const fetchAllTasks = createAsyncThunk('tasks/fetchAllTasks', async (_, { getState }) => {
  const state: any = getState();
  const lists = state.tasks.taskLists;
  
  // Concurrently fetch all tasks for every existing list ID
  const promises = lists.map((l: any) => api.get(`/tasks/list-tasks?task_list_id=${l.id}`).catch(() => ({ data: { data: [] } })));
  const responses = await Promise.all(promises);
  
  let aggregatedTasks: Task[] = [];
  responses.forEach((res: any) => {
    if (res?.data?.data) {
      aggregatedTasks = [...aggregatedTasks, ...res.data.data];
    }
  });
  
  return aggregatedTasks;
});

export const createTask = createAsyncThunk('tasks/createTask', async (taskData: any) => {
  const response = await api.post('/tasks/create-task', taskData);
  return response.data.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ taskId, taskData }: { taskId: string, taskData: any }) => {
  const response = await api.put(`/tasks/update-task?task_id=${taskId}`, taskData);
  return response.data.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId: string) => {
  await api.delete(`/tasks/delete-task?task_id=${taskId}`);
  return taskId;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentListId: (state, action) => {
      state.currentListId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeTaskList.fulfilled, (state, action) => {
        state.currentListId = action.payload.defaultListId;
        state.taskLists = action.payload.lists;
      })
      .addCase(createTaskList.fulfilled, (state, action) => {
        if (action.payload) {
          state.taskLists.push(action.payload);
        }
      })
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.allTasks = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        if (action.payload) {
          state.tasks.push(action.payload);
          state.allTasks.push(action.payload);
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        if (!action.payload) return;
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        const allIndex = state.allTasks.findIndex((t) => t.id === action.payload.id);
        if (allIndex !== -1) {
          state.allTasks[allIndex] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
        state.allTasks = state.allTasks.filter((t) => t.id !== action.payload);
      });
  },
});

export const { setCurrentListId } = tasksSlice.actions;
export default tasksSlice.reducer;
