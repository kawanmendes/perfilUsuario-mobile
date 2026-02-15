export interface FormData {
  nome: string;
  email: string;
  password: string;
}

export interface ValidationError {
  field: keyof FormData;
  message: string;
}
