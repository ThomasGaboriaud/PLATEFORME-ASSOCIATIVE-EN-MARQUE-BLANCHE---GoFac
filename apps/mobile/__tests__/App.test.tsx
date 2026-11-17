import { render, screen } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('affiche un titre accessible', async () => {
    await render(<App />);
    expect(screen.getByRole('header')).toBeTruthy();
  });
});
