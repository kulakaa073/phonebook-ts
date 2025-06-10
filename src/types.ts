export interface User {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Pick<User, 'email' | 'password'>;
  token: string;
}

export interface Contact {
  id: string;
  name: string;
  number: string;
}

export type Theme = 'light' | 'dark';
