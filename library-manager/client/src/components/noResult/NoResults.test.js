import React from 'react';
import { render, screen } from '@testing-library/react';
import NoResult from './NoResult';

describe('NoResult Component', () => {
  test('renders no results image', () => {
    render(<NoResult />);

    const noResultsImage = screen.getByAltText(/no results/i);
    expect(noResultsImage).toBeInTheDocument();
    expect(noResultsImage).toHaveAttribute('src', 'https://luit.co.in/assets/templates/labflix/images/no-results.png');
  });

  test('has correct class name', () => {
    const { container } = render(<NoResult />);
    expect(container.firstChild).toHaveClass('noResultsWrapper');
  });
});
