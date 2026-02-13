import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './HomeScreen.styles'

export default function HomeScreen() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEnviar = async () => {
    try {
      if (email.includes('@') && email.includes('.com') && password.length > 6) {
        await router.push({ pathname: '/second', params: { nome, email, password } });
      } else {
        alert('Preencha os campos corretamente (email e senha > 6 caracteres).');
      }
    } catch (error) {
      console.error('Erro assíncrono:', error);
      alert('Erro ao navegar.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo</Text>

        <TextInput
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.button} onPress={handleEnviar} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Ao continuar você aceita os termos.</Text>
      </View>
    </KeyboardAvoidingView>
  );
}