import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from './operations';
import { logout } from '../auth/operations';

import { type Contact } from '../../types';

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
  state.error = action.payload;
};

const slice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {},
  // Can use like this too:
  // extraReducers: {
  //    [fetchContacts.fulfilled]: (state, action) => { ... }
  // }
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
          const index = state.items.findIndex(
            item => item.id === action.payload.id
          );
          state.items.splice(index, 1);
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
