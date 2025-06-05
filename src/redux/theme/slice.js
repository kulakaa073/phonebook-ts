import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'theme',
  initialState: { name: 'light' }, // yes, evil
  reducers: {
    setTheme: {
      reducer: (state, action) => {
        state.name = action.payload.name;
      },
      prepare: name => {
        return { payload: { name } };
      },
    },
    // probably mode useful unless more themes, which is unlikely
    toggleTheme: {
      reducer: state => {
        state.name = state.name === 'light' ? 'dark' : 'light';
      },
    },
  },
});

export const { setTheme, toggleTheme } = slice.actions;
export const themeReducer = slice.reducer;
