import React, { useState, useCallback } from 'react';
import { View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthService } from '../../../src/services/auth.service';
import styles from '../../../src/shared/styles/form.styles';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(async () => {
    console.log('[LOGIN] Iniciando login');
    
    if (!email || !password) {
      console.log('[LOGIN] Campos vazios');
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    console.log('[LOGIN] Validando credenciais...');
    setLoading(true);
    
    try {
      const result = await AuthService.login(email, password);
      console.log('[LOGIN] Resultado:', result);
      
      setLoading(false);

      if (result.success) {
        console.log('[LOGIN] Redirecionando para perfil');
        router.replace('/profile');
      } else {
        console.log('[LOGIN] Erro:', result.message);
        Alert.alert('Erro', result.message);
      }
    } catch (error) {
      console.error('[LOGIN] Erro inesperado:', error);
      setLoading(false);
      Alert.alert('Erro', 'Ocorreu um erro inesperado');
    }
  }, [email, password, router]);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          placeholderTextColor="#999"
          editable={!loading}
        />

        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          autoComplete="password"
          placeholderTextColor="#999"
          editable={!loading}
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin} 
          activeOpacity={0.8}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.footer}>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
