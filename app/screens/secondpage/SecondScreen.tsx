import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import styles from './SecondScreen.styles';
import type { FormData } from '../../../src/shared/types/auth.types';

export default function SecondScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<Partial<FormData>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dados Recebidos</Text>
      
      <Text style={styles.label}>
        Nome: <Text style={styles.value}>{params.nome || 'N/A'}</Text>
      </Text>
      
      <Text style={styles.label}>
        Email: <Text style={styles.value}>{params.email || 'N/A'}</Text>
      </Text>
      
      <Text style={styles.label}>
        Senha: <Text style={styles.value}>{'*'.repeat(params.password?.length || 0)}</Text>
      </Text>

      <View style={styles.buttonWrap}>
        <Button title="Voltar" onPress={() => router.back()} />
      </View>
    </View>
  );
}