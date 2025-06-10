import type { Theme } from '../../types';
import { type RootState } from '../store';

export const selectTheme = (state: RootState): Theme => state.theme.name;
