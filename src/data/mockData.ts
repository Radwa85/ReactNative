export type Ingredient = {
  id: string;
  name: string;
  image?: any;
  imageFallback?: string; 
};

export type Product = {
  id: string;
  name: string;
  weight: string;
  rating: number;
  price: string;
  size: string;
  crust: string;
  deliveryTime: string;
  image?: any;
  ingredients: Ingredient[];
};

export const categories = [
  { id: '1', name: 'Pizza', iconImage: require('../../assets/images/pizza-icon.png') },
  { id: '2', name: 'Seafood', iconImage: require('../../assets/images/shrimp-icon.png') },
  { id: '3', name: 'Soft Drinks', iconImage: require('../../assets/images/soda-icon.png') },
];

export const popularItems: Product[] = [
  {
    id: 'pizza-primavera',
    name: 'Primavera Pizza',
    weight: 'Weight 540 gr',
    rating: 5.0,
    price: '$5.99',
    size: 'Medium 14"',
    crust: 'Thin Crust',
    deliveryTime: '30 min',
    image: require('../../assets/images/pizza1.png'),
    ingredients: [
      { id: 'i1', name: 'Ham', image: require('../../assets/images/ham.png') },
      { id: 'i2', name: 'Tomato', image: require('../../assets/images/tomato.png') },
      { id: 'i3', name: 'Garlic', image: require('../../assets/images/garlic.png') },
    ],
  },
  {
    id: 'pizza-primavera-2',
    name: 'Primavera Pizza',
    weight: 'Weight 540 gr',
    rating: 4.8,
    price: '$6.99',
    size: 'Large 16"',
    crust: 'Thick Crust',
    deliveryTime: '40 min',
    image: require('../../assets/images/pizza2.png'),
    ingredients: [
      { id: 'i1', name: 'Ham', image: require('../../assets/images/ham.png') },
      { id: 'i2', name: 'Tomato', image: require('../../assets/images/tomato.png') },
    ],
  }
];
