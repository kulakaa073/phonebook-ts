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

export interface Credentials {
  name?: string;
  email: string;
  password: string;
}

export interface RouteWrapperProps {
  element: React.ReactElement;
  redirectTo?: string;
}
