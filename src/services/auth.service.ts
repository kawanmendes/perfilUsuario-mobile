import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@app:users';
const CURRENT_USER_KEY = '@app:currentUser';

export interface User {
  id: string;
  nome: string;
  email: string;
  password: string;
}

export const AuthService = {
  async register(nome: string, email: string, password: string): Promise<{ success: boolean; message: string }> {
    try {
      console.log('[AUTH] Iniciando cadastro:', { nome, email });
      const users = await this.getAllUsers();
      console.log('[AUTH] Usuários existentes:', users.length);
      
      if (users.find(u => u.email === email)) {
        console.log('[AUTH] Email já cadastrado');
        return { success: false, message: 'Email já cadastrado' };
      }

      const newUser: User = {
        id: Date.now().toString(),
        nome,
        email,
        password,
      };

      users.push(newUser);
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
      await AsyncStorage.setItem(CURRENT_USER_KEY, email);
      console.log('[AUTH] Cadastro realizado com sucesso');

      return { success: true, message: 'Cadastro realizado com sucesso' };
    } catch (error) {
      console.error('[AUTH] Erro ao cadastrar:', error);
      return { success: false, message: 'Erro ao cadastrar usuário' };
    }
  },

  async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      console.log('[AUTH] Tentando login:', email);
      const users = await this.getAllUsers();
      console.log('[AUTH] Total de usuários:', users.length);
      
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        console.log('[AUTH] Credenciais inválidas');
        return { success: false, message: 'Email ou senha incorretos' };
      }

      await AsyncStorage.setItem(CURRENT_USER_KEY, email);
      console.log('[AUTH] Login realizado com sucesso');
      return { success: true, message: 'Login realizado com sucesso', user };
    } catch (error) {
      console.error('[AUTH] Erro ao fazer login:', error);
      return { success: false, message: 'Erro ao fazer login' };
    }
  },

  async logout(): Promise<void> {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const email = await AsyncStorage.getItem(CURRENT_USER_KEY);
      if (!email) return null;

      const users = await this.getAllUsers();
      return users.find(u => u.email === email) || null;
    } catch (error) {
      return null;
    }
  },

  async getAllUsers(): Promise<User[]> {
    try {
      const data = await AsyncStorage.getItem(USERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      return [];
    }
  },
};
