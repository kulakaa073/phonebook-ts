import { createSlice } from '@reduxjs/toolkit';

interface Theme {
  name: string;
}

const initialState: Theme = { name: 'light' }; // yes, evil

const slice = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    setTheme: {
      reducer: (state, action) => {
        state.name = action.payload.name;
      },
      prepare: (name: string) => {
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
