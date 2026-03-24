import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import { useSelector, useDispatch } from 'react-redux';
import { createTaskList } from '../../src/redux/slices/tasksSlice';
import { useRouter } from 'expo-router';
import { AppDispatch } from '../../src/redux/store';

function CustomDrawerContent(props: any) {
  const { taskLists } = useSelector((state: any) => state.tasks);
  const [newListTitle, setNewListTitle] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleAddList = () => {
    if (newListTitle.trim()) {
      dispatch(createTaskList(newListTitle.trim()));
      setNewListTitle('');
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      
      <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 10 }} />
      
      {taskLists?.map((list: any) => {
    
        return (
          <DrawerItem
            key={list.id}
            label={list.title}
            icon={({color}) => <FontAwesome name="list-ul" size={20} color={color} />}
            onPress={() => router.push(`/(tabs)/list?listId=${list.id}&title=${list.title}` as any)}
          />
        );
      })}

      <View style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome name="plus" size={20} color={colors.primary} style={{ marginRight: 15, marginLeft: 5 }} />
        <TextInput 
          placeholder="New List" 
          value={newListTitle} 
          onChangeText={setNewListTitle} 
          onSubmitEditing={handleAddList}
          style={{ flex: 1, fontSize: 16, color: colors.text }}
          placeholderTextColor={colors.textLight}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: colors.primary,
        headerShown: true, // Show header titles
      }}>
      <Drawer.Screen
        name="index" 
        options={{
          drawerLabel: 'All Tasks',
          title: 'Tasks',
          drawerIcon: ({ color }) => <FontAwesome size={24} name="list-alt" color={color} />,
        }}
      />
      <Drawer.Screen
        name="list"
        options={{
          drawerItemStyle: { display: 'none' },
          headerShown: true
        }}
      />
    </Drawer>
  );
}
