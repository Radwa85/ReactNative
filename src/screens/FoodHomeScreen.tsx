import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { categories, popularItems } from '../data/mockData';
import { foodHomeStyles as styles } from '../theme/foodHomeStyles';

export default function FoodHomeScreen() {
  const router = useRouter();
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id);
  const [savedItems, setSavedItems] = useState<string[]>([]);

  const toggleSaveItem = (id: string) => {
    if (savedItems.includes(id)) {
      setSavedItems(savedItems.filter(item => item !== id));
    } else {
      setSavedItems([...savedItems, id]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image 
            source={require('../../assets/images/profile.png')} 
            style={styles.avatar} 
          />
          <TouchableOpacity>
            <MaterialCommunityIcons name="menu" size={28} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.subtitle}>Food</Text>
          <Text style={styles.title}>Delivery</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchIconContainer}>
            <MaterialCommunityIcons name="magnify" size={24} color="#888" />
          </View>
          <View style={styles.searchInputContainer}>
            <TextInput 
              style={styles.searchInput} 
              placeholder="Search..." 
              placeholderTextColor="#C4C4C4"
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesList}>
          {categories.map((cat) => {
            const isActive = cat.id === activeCategoryId;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryCard, isActive && styles.categoryCardActive]}
                onPress={() => setActiveCategoryId(cat.id)}
              >
                <View style={styles.categoryIconContainer}>
                  {cat.iconImage ? (
                    <Image source={cat.iconImage} style={{ width: 40, height: 40, resizeMode: 'contain' }} />
                  ) : (
                    <MaterialCommunityIcons 
                      name="food" 
                      size={40} 
                      color={isActive ? "#333" : "#F06E66"} 
                    />
                  )}
                </View>
                <Text style={[styles.categoryName, isActive && styles.categoryNameActive]}>
                  {cat.name}
                </Text>
                <View style={[styles.categoryArrowBtn, isActive ? styles.arrowActiveBg : styles.arrowInactiveBg]}>
                  <MaterialCommunityIcons 
                    name="chevron-right" 
                    size={20} 
                    color={isActive ? "#333" : "#FFF"} 
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionTitle}>Popular</Text>
        {popularItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.popularCard}
            onPress={() => router.push({ pathname: '/details', params: { id: item.id } } as any)}
          >
            <View style={styles.popularInfo}>
              <View style={styles.topWeekContainer}>
                <MaterialCommunityIcons name="crown" size={16} color="#F6CA45" />
                <Text style={styles.topWeekText}>top of the week</Text>
              </View>
              
              <Text style={styles.popularName}>{item.name}</Text>
              <Text style={styles.popularWeight}>{item.weight}</Text>

              <View style={styles.popularBottomRow}>
                <TouchableOpacity style={styles.addButton} onPress={() => toggleSaveItem(item.id)}>
                  <MaterialCommunityIcons name={savedItems.includes(item.id) ? "check" : "plus"} size={24} color="#333" />
                </TouchableOpacity>
                <View style={styles.ratingContainer}>
                  <FontAwesome name="star" size={14} color="#333" />
                  <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                </View>
              </View>
            </View>

            <Image 
              source={item.image ? item.image : { uri: 'https://cdn-icons-png.flaticon.com/512/3595/3595458.png' }} 
              style={styles.popularImage} 
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}


