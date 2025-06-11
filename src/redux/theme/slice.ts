import { createSlice } from '@reduxjs/toolkit';
import type { Theme } from '../../types';

interface ThemeState {
  name: Theme;
}
const initialState: ThemeState = { name: 'light' }; // yes, evil

const slice = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    setTheme: {
      reducer: (state, action: { payload: { name: Theme } }) => {
        state.name = action.payload.name;
      },
      prepare: (name: Theme) => {
        return { payload: { name } };
      },
    },
    // probably mode useful unless more themes, which is unlikely
    toggleTheme(state) {
      state.name = state.name === 'light' ? 'dark' : 'light';
    },
  },
});

export const { setTheme, toggleTheme } = slice.actions;
export const themeReducer = slice.reducer;
