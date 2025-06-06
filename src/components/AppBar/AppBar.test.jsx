import { describe, it, expect } from 'vitest';
import AppBar from './AppBar';

describe('AppBar', () => {
    it('renders correctly', () => {
        expect(AppBar).toBeDefined();
    });

    it('has the correct title', () => {
        const title = 'My App';
        expect(AppBar.title).toBe(title);
    });
});