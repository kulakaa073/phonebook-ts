import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global/';

// {GET}
// /contacts
// headers: Authorization: Beared token
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// {POST}
// /contacts
// headers: Authorization: Beared token
// body: {  name: string,
//          number: string, }
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', contact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// {PATCH}
// /contacts/{contactId}
// path: contactId: integer
// headers: Authorization: Beared token
// body: {  name: string,
//          number: string, }
export const editContact = createAsyncThunk(
  'contacts/editContact',
  async ({ contactId, contactUpdates }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/contacts/${contactId}`,
        contactUpdates
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// {DELETE}
// /contacts/{contactId}
// path: contactId: integer
// headers: Authorization: Beared token
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
