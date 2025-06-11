export interface User {
  name: string | null;
  email: string | null;
}

export interface Contact {
  id: string;
  name: string;
  number: string;
}

export type Theme = 'light' | 'dark';
