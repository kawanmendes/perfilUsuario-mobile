import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthService, User } from '../../../src/services/auth.service';
import styles from '../secondpage/SecondScreen.styles';

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const currentUser = await AuthService.getCurrentUser();
    if (!currentUser) {
      router.replace('/');
    } else {
      setUser(currentUser);
    }
  };

  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        onPress: async () => {
          await AuthService.logout();
          router.replace('/');
        },
      },
    ]);
  };

  if (!user) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      
      <Text style={styles.label}>
        Nome: <Text style={styles.value}>{user.nome}</Text>
      </Text>
      
      <Text style={styles.label}>
        Email: <Text style={styles.value}>{user.email}</Text>
      </Text>

      <View style={styles.buttonWrap}>
        <TouchableOpacity 
          style={{ backgroundColor: '#dc2626', padding: 12, borderRadius: 8 }}
          onPress={handleLogout}
        >
          <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
