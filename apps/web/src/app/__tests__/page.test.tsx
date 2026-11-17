import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from '../page';

describe('HomePage', () => {
  it('affiche un titre de niveau 1', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toBeDefined();
  });
});
