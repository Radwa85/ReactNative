import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {styles} from '../../constants/styles';
export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSignUp = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Please enter your password.');
      return;
    }
    if (password !== repeatPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    
    Alert.alert('Success', 'Account created successfully!');
  };

  return (<View style={styles.card}>
  <Text style={styles.title}>Sign Up</Text>

  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder="e-mail"
      placeholderTextColor="#a0a0a0"
      keyboardType="email-address"
      value={email}
      onChangeText={setEmail}
    />

    <TextInput
      style={styles.input}
      placeholder="password"
      placeholderTextColor="#a0a0a0"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />

    <TextInput
      style={styles.input}
      placeholder="repeat password"
      placeholderTextColor="#a0a0a0"
      secureTextEntry
      value={repeatPassword}
      onChangeText={setRepeatPassword}
    />
  </View>

  <View style={styles.bottomContainer}>
    <TouchableOpacity onPress={handleSignUp} style={styles.buttonWrapper}>
      <LinearGradient
        colors={['#1aa2bd', '#a8e1f6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </LinearGradient>
    </TouchableOpacity>

    <TouchableOpacity>
      <Text style={styles.licenseText}>
        Read User License Agreement
      </Text>
    </TouchableOpacity>
  </View>
</View>
  );
}

