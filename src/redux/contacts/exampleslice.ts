import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from './operations';
import { logout } from '../auth/operations';

export interface Contact {
  id: string;
  name: string;
  number: string;
}

interface ContactsState {
  items: Contact[];
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: ContactsState = {
  items: [],
  isLoading: false,
  error: null,
  lastFetched: null,
};

const handlePending = (state: ContactsState) => {
  state.isLoading = true;
};

const handleRejected = (state: ContactsState, action: PayloadAction<any>) => {
  state.isLoading = false;
  state.error =
    action.payload && typeof action.payload === 'string'
      ? action.payload
      : 'Something went wrong';
};

const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(
        fetchContacts.fulfilled,
        (state, action: PayloadAction<Contact[]>) => {
          state.isLoading = false;
          state.error = null;
          state.items = action.payload;
          state.lastFetched = Date.now();
        }
      )
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(
        addContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.isLoading = false;
          state.error = null;
          state.items.push(action.payload);
        }
      )
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(
        deleteContact.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          state.isLoading = false;
          state.error = null;
          state.items = state.items.filter(
            item => item.id !== action.payload.id
          );
        }
      )
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(logout.fulfilled, state => {
        state.items = [];
      })
      .addCase(editContact.pending, handlePending)
      .addCase(
        editContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.isLoading = false;
          state.error = null;
          const index = state.items.findIndex(
            item => item.id === action.payload.id
          );
          if (index !== -1) {
            state.items[index] = {
              ...state.items[index],
              ...action.payload,
            };
          }
        }
      )
      .addCase(editContact.rejected, handleRejected);
  },
});

export const contactsReducer = slice.reducer;
