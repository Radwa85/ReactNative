import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../redux/slices/tasksSlice';
import { AppDispatch } from '../redux/store';

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AddTaskModal({ visible, onClose }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { currentListId } = useSelector((state: any) => state.tasks);

  const handleSave = () => {
    if (!title.trim()) return;
    if (!currentListId) {
      alert("Please wait a moment while the app initializes your task lists.");
      return;
    }
    
    const newTask = {
      taskListId: currentListId,
      title: title.trim(),
      description: description.trim(),
      priority: 'LOW',
      dueDate: new Date().toISOString(), 
      status: 'OPEN'
    };

    dispatch(createTask(newTask));
    
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>New Task</Text>
          
          <TextInput
            style={styles.input}
            placeholder="What do you need to do?"
            placeholderTextColor={colors.textLight}
            value={title}
            onChangeText={setTitle}
            autoFocus
          />
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Notes / Description (optional)"
            placeholderTextColor={colors.textLight}
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.cancelBtn]} onPress={onClose}>
              <Text style={styles.cancelTxt}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button, styles.saveBtn]} onPress={handleSave}>
              <Text style={styles.saveTxt}>Save Task</Text>
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
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    minHeight: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
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
