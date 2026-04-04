import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import FoodDetailsScreen from '../src/screens/FoodDetailsScreen';

export default function DetailsRoute() {
  const params = useLocalSearchParams();
  const id = typeof params.id === 'string' ? params.id : undefined;

  return <FoodDetailsScreen id={id} />;
}
