import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import styles from './SecondScreen.styles';

export default function SecondScreen() {
  const router = useRouter();
  const { nome, email } = useLocalSearchParams<{ nome?: string; email?: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dados Recebidos</Text>
      <Text style={styles.label}>Nome: <Text style={styles.value}>{nome}</Text></Text>
      <Text style={styles.label}>Email: <Text style={styles.value}>{email}</Text></Text>

      <View style={styles.buttonWrap}>
        <Button title="Voltar" onPress={() => router.back()} />
      </View>
    </View>
  );
}