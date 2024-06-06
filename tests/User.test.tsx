import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import User from '../pages/frontend/user';
import { describe } from 'node:test';

describe('User Component', () => {

  test('adds a user', () => {
    render(
      <Provider store={store}>
        <User />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText('add'));

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Testing User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '123-123-1234' } });
    fireEvent.change(screen.getByLabelText(/website/i), { target: { value: 'newuser.com' } });

    fireEvent.click(screen.getByText('Add'));

    const state = store.getState().users;
    expect(state.users).toContainEqual(expect.objectContaining({ 
      name: 'Testing User', 
      email: 'newuser@example.com', 
      phone: '123-123-1234', 
      website: 'newuser.com' 
    }));
  });

  test('renders user list', () => {
    render(
      <Provider store={store}>
        <User />
      </Provider>
    );

    expect(screen.getByText('Testing User')).toBeInTheDocument();
  });

  test('edits a user', () => {
    render(
      <Provider store={store}>
        <User />
      </Provider>
    );

    fireEvent.click(screen.getByText('Testing User'));

    fireEvent.click(screen.getByText(/edit/i));

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Testing User Updated' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'newuser@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '081234' } });
    fireEvent.change(screen.getByLabelText(/website/i), { target: { value: 'newuser.id' } });

    fireEvent.click(screen.getByText(/save/i));

    const state = store.getState().users;
    expect(state.users).toContainEqual(expect.objectContaining({ 
      name: 'Testing User Updated', 
      email: 'newuser@gmail.com', 
      phone: '081234', 
      website: 'newuser.id' 
    }));
  });

  test('deletes a user', () => {
    render(
      <Provider store={store}>
        <User />
      </Provider>
    );

    fireEvent.click(screen.getByText('Testing User Updated'));

    fireEvent.click(screen.getByText(/delete/i));
    fireEvent.click(screen.getByTestId('del2'));

    const state = store.getState().users;
    expect(state.users).not.toContainEqual(expect.objectContaining({ name: 'Testing Name Updated' }));
  });
});