export interface UserCredentials {
  name?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
