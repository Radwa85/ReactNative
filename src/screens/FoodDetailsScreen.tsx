import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { popularItems } from '../data/mockData';
import { foodDetailsStyles as styles } from '../theme/foodDetailsStyles';

export default function FoodDetailsScreen({ id }: { id?: string }) {
  const router = useRouter();
  const product = popularItems.find(p => p.id === id) || popularItems[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons name="chevron-left" size={24} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.favButton}>
            <FontAwesome name="star" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>{product.price}</Text>

        <View style={styles.middleSection}>
          <View style={styles.infoCol}>
            
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Size</Text>
              <Text style={styles.infoValue}>{product.size}</Text>
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Crust</Text>
              <Text style={styles.infoValue}>{product.crust}</Text>
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Delivery in</Text>
              <Text style={styles.infoValue}>{product.deliveryTime}</Text>
            </View>

          </View>

          <View style={styles.imageCol}>
            <Image 
              source={product.image ? product.image : { uri: 'https://cdn-icons-png.flaticon.com/512/3595/3595458.png' }} 
              style={styles.productImage} 
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Ingredients</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.ingredientsList} style={{ overflow: 'visible' }}>
          {product.ingredients.map((ing) => (
            <View key={ing.id} style={styles.ingredientCard}>
              {ing.image ? (
                <Image source={ing.image} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
              ) : (
                <View style={[styles.ingredientColorBlock, { backgroundColor: ing.imageFallback || '#EEE' }]}>
                  <Text style={styles.ingredientInitial}>{ing.name.charAt(0)}</Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </ScrollView>
      
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>Place an order</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#333" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

