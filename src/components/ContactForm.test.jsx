import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import ContactForm from './ContactForm.jsx';

beforeEach(() => {
  fetch.resetMocks();
});

test('submits form via fetch', async () => {
  fetch.mockResponseOnce('{}', { status: 200 });
  render(<ContactForm />);
  fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'A' } });
  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'a@b.com' } });
  fireEvent.change(screen.getByPlaceholderText(/message/i), { target: { value: 'hi' } });
  fireEvent.submit(screen.getByRole('form'));
  expect(fetch).toHaveBeenCalled();
});

test('falls back to mailto on error', async () => {
  fetch.mockReject(new Error('fail'));
  window.open = jest.fn();
  render(<ContactForm />);
  fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'A' } });
  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'a@b.com' } });
  fireEvent.change(screen.getByPlaceholderText(/message/i), { target: { value: 'hi' } });
  await fireEvent.submit(screen.getByRole('form'));
  expect(window.open).toHaveBeenCalledWith(expect.stringContaining('mailto:'));
});

test('accessibility', async () => {
  const { container } = render(<ContactForm />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
