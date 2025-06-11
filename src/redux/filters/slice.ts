import { createSlice } from '@reduxjs/toolkit';

interface FilterState {
  filter: string;
}

const initialState: FilterState = {
  filter: '',
};

const slice = createSlice({
  name: 'filters',
  initialState: initialState,
  reducers: {
    setFilter: {
      reducer: (state, action) => {
        state.filter = action.payload.filter;
      },
      prepare: (filter: string) => {
        return {
          payload: { filter },
          meta: undefined,
          error: undefined,
        };
      },
    },
  },
});

export const { setFilter } = slice.actions;
export const filtersReducer = slice.reducer;
