import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { type RootState } from '../store';

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
export const register = createAsyncThunk(
  'auth/register ',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('users/signup', credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(String(error));
    }
  }
);

// {POST}
// users/login
// body: {  "email": "string",
//          "password": "string" }
export const login = createAsyncThunk(
  'auth/logIn',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('users/login', credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(String(error));
    }
  }
);

// {POST}
// /users/logout
// headers: Authorization: Beared token
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.post('users/logout');
    clearAuthHeader();
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue(String(error));
  }
});

// {GET}
// /users/current
// headers: Authorization: Beared token
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    // get persisted state to get saved auth token
    const state: RootState = thunkAPI.getState();
    const persistedToken = state.auth.token;
    try {
      // attach saved token to header
      setAuthHeader(persistedToken);
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    // learn more later
    condition: (_, thunkAPI) => {
      // get persisted state to get saved auth token
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;

      return persistedToken !== null;
    },
  }
);
