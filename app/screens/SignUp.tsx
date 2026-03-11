import { router, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../../constants/styles';

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
    Alert.alert('Success', 'Signed up successfully!');
  };

  return (<View style={styles.card}>
    <Stack.Screen options={{ headerShown: false }} />
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

      <TouchableOpacity onPress={() => router.push('/screens/UserDetails')} style={[styles.buttonWrapper, { marginTop: 15 }]}>
        <LinearGradient
          colors={['#e5e6ea', '#ebeff9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={[styles.buttonText, { color: '#1aa2bd' }]}>Show User Details</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 15 }}>
        <Text style={styles.licenseText}>
          Read User License Agreement
        </Text>
      </TouchableOpacity>
    </View>
  </View>
  );
}

