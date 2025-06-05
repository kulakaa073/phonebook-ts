import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'filters',
  initialState: {
    filter: '',
  },
  reducers: {
    setFilter: {
      reducer: (state, action) => {
        state.filter = action.payload.filter;
      },
      prepare: filter => {
        return {
          payload: { filter },
        };
      },
    },
  },
});

export const { setFilter } = slice.actions;
export const filtersReducer = slice.reducer;
