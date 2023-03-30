import Home from '@/pages';
import { render } from '@testing-library/react';
import React from 'react';

describe('HomePage', () => {
    it('renders the homepage', () => {
      const { getByText } = render(<Home />);
      const titleElement = getByText('Hello world');
  
      expect(titleElement).toBeInTheDocument();
    });
  });