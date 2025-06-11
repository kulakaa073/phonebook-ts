import type { RootState } from '../store';

export const selectFilter = (state: RootState) => state.filters.filter;
