import React from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { styles } from '../../constants/styles';
import { useUSerData } from '../../hooks/useUserData';

export default function UserDetails() {
  const { data: user, loading, error } = useUSerData('1');

  return (
    <View style={[styles.card, { paddingVertical: 40, flex: 1, justifyContent: 'center' }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.title}>User Details</Text>

      {loading && <ActivityIndicator size="large" color="#1aa2bd" style={{ marginTop: 30 }} />}

      {error && <Text style={{ color: 'red', marginTop: 20, textAlign: 'center' }}>{error}</Text>}

      {user && (
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <Image
            source={{ uri: user.avatar_url }}
            style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 20, borderWidth: 3, borderColor: '#1aa2bd' }}
          />
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 5 }}>
            {user.name || user.login}
          </Text>
          {user.bio ? (
            <Text style={{ fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 15, paddingHorizontal: 20 }}>
              {user.bio}
            </Text>
          ) : null}

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15,marginTop:15, width: "auto" }}>
            <View style={{ alignItems: 'center', marginHorizontal: 15 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1aa2bd' }}>{user.followers}</Text>
              <Text style={{ fontSize: 14, color: '#888' }}>Followers</Text>
            </View>
            <View style={{ alignItems: 'center', marginHorizontal: 15 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1aa2bd' }}>{user.following}</Text>
              <Text style={{ fontSize: 14, color: '#888' }}>Following</Text>
            </View>
            <View style={{ alignItems: 'center', marginHorizontal: 15 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1aa2bd' }}>{user.public_repos}</Text>
              <Text style={{ fontSize: 14, color: '#888' }}>Repos</Text>
            </View>
          </View>

          <Text style={{ fontSize: 14, color: '#555', marginTop: 5 }}>
             {user.location || 'Location Not available'}
          </Text>
        </View>
      )}
    </View>
  );
}
