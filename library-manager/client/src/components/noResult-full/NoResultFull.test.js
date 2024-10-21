import React from 'react';
import { render, screen } from '@testing-library/react';
import NoResultFull from './NoResultFull';

describe('NoResultFull Component', () => {
  test('renders no results image', () => {
    render(<NoResultFull />);

    const noResultsImage = screen.getByAltText(/no results/i);
    expect(noResultsImage).toBeInTheDocument();
    expect(noResultsImage).toHaveAttribute('src', 'https://luit.co.in/assets/templates/labflix/images/no-results.png');
  });

  test('has correct class name', () => {
    const { container } = render(<NoResultFull />);
    expect(container.firstChild).toHaveClass('noResultsWrapperFull');
  });
});
