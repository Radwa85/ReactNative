import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import AddTaskModal from '../components/AddTaskModal';
import EditTaskModal from '../components/EditTaskModal';
import { taskStyles as styles } from '../theme/taskStyles';
import { colors } from '../theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { initializeTaskList, fetchAllTasks, Task } from '../redux/slices/tasksSlice';
import { AppDispatch } from '../redux/store';
import { FontAwesome } from '@expo/vector-icons';

export default function TasksScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { allTasks, status } = useSelector((state: any) => state.tasks);

  useEffect(() => {
    dispatch(initializeTaskList()).then(() => dispatch(fetchAllTasks()));
  }, [dispatch]);

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity style={styles.checkCircle}>
        <FontAwesome name="circle-thin" size={24} color={colors.textLight} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.taskBody} onPress={() => setEditingTask(item)}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskDueDate}>Due: {new Date(item.dueDate).toLocaleDateString()}</Text>
      </TouchableOpacity>
      {item.priority === 'HIGH' && <FontAwesome name="star" size={20} color="#ff9900" />}
    </View>
  );

  return (
    <View style={styles.container}>
      {status === 'loading' && <Text style={styles.loading}>Loading tasks...</Text>}
      
      <FlatList
        data={allTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.empty}>No tasks available. Create one!</Text>}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <FontAwesome name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      <AddTaskModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
      <EditTaskModal visible={!!editingTask} task={editingTask} onClose={() => setEditingTask(null)} />
    </View>
  );
}
