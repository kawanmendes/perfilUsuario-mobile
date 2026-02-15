import { FormData, ValidationError } from '../types/auth.types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;
const MIN_NAME_LENGTH = 2;

export const validateForm = (data: FormData): ValidationError | null => {
  if (!data.nome.trim() || data.nome.trim().length < MIN_NAME_LENGTH) {
    return { field: 'nome', message: 'Nome deve ter pelo menos 2 caracteres' };
  }

  if (!EMAIL_REGEX.test(data.email)) {
    return { field: 'email', message: 'Email inválido' };
  }

  if (data.password.length <= MIN_PASSWORD_LENGTH) {
    return { field: 'password', message: 'Senha deve ter mais de 6 caracteres' };
  }

  return null;
};
