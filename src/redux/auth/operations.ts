import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { type RootState } from '../store';
import type { User, Credentials } from '../../types';

// Utility to add JWT
const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// {POST}
// /users/signup
// body: {  "name": 'string',
//          "email": 'string',
//          "password": 'string' }
// response: { user:{ name: 'string',
//                    email:'string',
//                  },
//                  token: 'string' }
export const register = createAsyncThunk<
  { user: User; token: string },
  Credentials,
  { rejectValue: string }
>('auth/register ', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post<{ user: User; token: string }>(
      'users/signup',
      credentials
    );
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : String(error)
    );
  }
});

// {POST}
// users/login
// body: {  "email": "string",
//          "password": "string" }
export const login = createAsyncThunk<
  { user: User; token: string },
  Credentials,
  { rejectValue: string }
>('auth/logIn', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post<{ user: User; token: string }>(
      'users/login',
      credentials
    );
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : String(error)
    );
  }
});

// {POST}
// /users/logout
// headers: Authorization: Beared token
export const logout = createAsyncThunk<unknown, void, { rejectValue: string }>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const response = await axios.post('users/logout');
      clearAuthHeader();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : String(error)
      );
    }
  }
);

// {GET}
// /users/current
// headers: Authorization: Beared token
export const refreshUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>(
  'auth/refresh',
  async (_, thunkAPI) => {
    // get persisted state to get saved auth token
    const state = thunkAPI.getState() as RootState;
    const persistedToken: string | null = state.auth.token;
    try {
      // attach saved token to header
      if (typeof persistedToken === 'string' && persistedToken) {
        setAuthHeader(persistedToken);
      } else {
        return thunkAPI.rejectWithValue('No authentication token found');
      }
      const response = await axios.get<User>('/users/current');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : String(error)
      );
    }
  },
  {
    // learn more later
    condition: (_, thunkAPI) => {
      // get persisted state to get saved auth token
      const state = thunkAPI.getState() as RootState;
      const persistedToken = state.auth.token;

      return persistedToken !== null;
    },
  }
);
