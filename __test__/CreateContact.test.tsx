import ContactForm from '@/components/molecules/ContactForm';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('Create Validation Error', () => {
  it('displays validation error when phone number is invalid', async () => {
    await act(async () => {
      render(<ContactForm />);
    });

    const input = screen.getByPlaceholderText('Phone Number');
    fireEvent.change(input, { target: { value: 'not a phone number' } });
    fireEvent.submit(screen.getByTestId('submit-btn'));

    const error = await screen.findByText('Phone number not valid');
    expect(error).toBeInTheDocument();
  });

  it('displays validation error when name is not filled', async () => {
    await act(async () => {
      render(<ContactForm />);
    });

    const input = screen.getByPlaceholderText('Last Name');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.submit(screen.getByTestId('submit-btn'));

    const error = await screen.findByText('first_name is a required field');
    expect(error).toBeInTheDocument();

    const input1 = screen.getByPlaceholderText('First Name');
    fireEvent.change(input1, { target: { value: '' } });
    fireEvent.submit(screen.getByTestId('submit-btn'));

    const error1 = await screen.findByText('last_name is a required field');
    expect(error1).toBeInTheDocument();
  });
});

describe('Test Add and remove phone field', () => {
  it("adds a new phone number field when 'Add Number' is clicked", async () => {
    await act(async () => {
      render(<ContactForm />);
    });

    const addButton = screen.getByTestId('add-phone-number-field');
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    const newInput = screen.queryAllByPlaceholderText('Phone Number');
    expect(newInput).toHaveLength(3);
  });

  it("removes a phone number field when 'Remove Phone' is clicked", async () => {
    await act(async () => {
      render(<ContactForm />);
    });

    const removeButton = screen.getByTestId('remove-phone-number-field');
    fireEvent.click(removeButton);

    const removedInput = screen.queryAllByPlaceholderText('Phone Number');
    expect(removedInput).toHaveLength(1);
  });
});
