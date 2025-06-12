import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Contact } from '../../types';

axios.defaults.baseURL = 'https://connections-api.goit.global/';

// {GET}
// /contacts
// headers: Authorization: Beared token
export const fetchContacts = createAsyncThunk<
  Contact[], // payload return type
  void, // argument type
  { rejectValue: string } // reject type
>('contacts/fetchContacts', async (_, thunkAPI) => {
  try {
    const response = await axios.get<Contact[]>('/contacts');
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue(String(error));
  }
});

// {POST}
// /contacts
// headers: Authorization: Beared token
// body: {  name: string,
//          number: string, }
export const addContact = createAsyncThunk<
  Contact,
  Omit<Contact, 'id'>,
  { rejectValue: string }
>('contacts/addContact', async (contact, thunkAPI) => {
  try {
    const response = await axios.post<Contact>('/contacts', contact);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue(String(error));
  }
});

// {PATCH}
// /contacts/{contactId}
// path: contactId: integer
// headers: Authorization: Beared token
// body: {  name: string,
//          number: string, }
export const editContact = createAsyncThunk<
  Contact,
  { contactId: string; contactUpdates: Omit<Contact, 'id'> },
  { rejectValue: string }
>('contacts/editContact', async ({ contactId, contactUpdates }, thunkAPI) => {
  try {
    const response = await axios.patch<Contact>(
      `/contacts/${contactId}`,
      contactUpdates
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue(String(error));
  }
});

// {DELETE}
// /contacts/{contactId}
// path: contactId: integer
// headers: Authorization: Beared token
export const deleteContact = createAsyncThunk<
  Contact,
  string | null,
  { rejectValue: string }
>('contacts/deleteContact', async (contactId, thunkAPI) => {
  try {
    const response = await axios.delete<Contact>(`/contacts/${contactId}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue(String(error));
  }
});
