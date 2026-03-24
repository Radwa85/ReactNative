import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Switch } from 'react-native';
import { colors } from '../theme/colors';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask, Task } from '../redux/slices/tasksSlice';
import { AppDispatch } from '../redux/store';
import { FontAwesome } from '@expo/vector-icons';

interface EditTaskModalProps {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
}

export default function EditTaskModal({ visible, task, onClose }: EditTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setIsImportant(task.priority === 'HIGH');
    }
  }, [task]);

  const handleUpdate = () => {
    if (!title.trim() || !task) return;
    
    const updatedData = {
      ...task,
      title: title.trim(),
      description: description.trim(),
      priority: isImportant ? 'HIGH' : 'LOW'
    };

    dispatch(updateTask({ taskId: task.id, taskData: updatedData }));
    onClose();
  };

  const handleDelete = () => {
    if (!task) return;
    dispatch(deleteTask(task.id));
    onClose();
  };

  if (!task) return null;

  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.modalTitle}>Edit Task</Text>
            <TouchableOpacity onPress={handleDelete} style={styles.deleteIcon}>
              <FontAwesome name="trash" size={24} color="#ff4444" />
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="Task Title"
            placeholderTextColor={colors.textLight}
            value={title}
            onChangeText={setTitle}
          />
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Notes / Description"
            placeholderTextColor={colors.textLight}
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Mark as Important</Text>
            <Switch
              value={isImportant}
              onValueChange={setIsImportant}
              trackColor={{ false: '#ddd', true: colors.primary }}
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.cancelBtn]} onPress={onClose}>
              <Text style={styles.cancelTxt}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button, styles.saveBtn]} onPress={handleUpdate}>
              <Text style={styles.saveTxt}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  deleteIcon: {
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    marginBottom: 15,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  switchLabel: {
    fontSize: 16,
    color: colors.text,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelBtn: {
    backgroundColor: '#f0f0f0',
  },
  saveBtn: {
    backgroundColor: colors.primary,
  },
  cancelTxt: {
    color: colors.text,
    fontWeight: '600',
  },
  saveTxt: {
    color: '#fff',
    fontWeight: '600',
  }
});
