import React, { useState, useCallback } from 'react';
import { View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthService } from '../../../src/services/auth.service';
import { validateForm } from '../../../src/shared/utils/validation';
import type { FormData } from '../../../src/shared/types/auth.types';
import styles from '../../../src/shared/styles/form.styles';

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleRegister = useCallback(async () => {
    console.log('[REGISTER] Iniciando cadastro');
    const validationError = validateForm(formData);
    
    if (validationError) {
      console.log('[REGISTER] Erro de validação:', validationError);
      Alert.alert('Erro de validação', validationError.message);
      return;
    }

    console.log('[REGISTER] Dados válidos, registrando...');
    setLoading(true);
    
    try {
      const result = await AuthService.register(formData.nome, formData.email, formData.password);
      console.log('[REGISTER] Resultado:', result);
      
      setLoading(false);

      if (result.success) {
        console.log('[REGISTER] Sucesso, redirecionando');
        Alert.alert('Sucesso', result.message, [
          { text: 'OK', onPress: () => router.replace('/profile') }
        ]);
      } else {
        console.log('[REGISTER] Erro:', result.message);
        Alert.alert('Erro', result.message);
      }
    } catch (error) {
      console.error('[REGISTER] Erro inesperado:', error);
      setLoading(false);
      Alert.alert('Erro', 'Ocorreu um erro inesperado');
    }
  }, [formData, router]);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro</Text>

        <TextInput
          placeholder="Nome"
          value={formData.nome}
          onChangeText={(value) => updateField('nome', value)}
          style={styles.input}
          placeholderTextColor="#999"
          autoCapitalize="words"
          editable={!loading}
        />

        <TextInput
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => updateField('email', value)}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          placeholderTextColor="#999"
          editable={!loading}
        />

        <TextInput
          placeholder="Senha"
          value={formData.password}
          onChangeText={(value) => updateField('password', value)}
          style={styles.input}
          secureTextEntry
          autoComplete="password"
          placeholderTextColor="#999"
          editable={!loading}
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleRegister} 
          activeOpacity={0.8}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Cadastrando...' : 'Cadastrar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.footer}>Já tem conta? Faça login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
