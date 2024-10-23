import React from 'react';
import { render, screen } from '@testing-library/react';
import NoResult from './NoResult';
import noResultsImage1 from "../../assets/images/no-result-found.png"

describe('NoResult Component', () => {
  test('renders no results image', () => {
    render(<NoResult />);

    const noResultsImage = screen.getByAltText(/no results/i);
    expect(noResultsImage).toBeInTheDocument();
    expect(noResultsImage).toHaveAttribute('src', noResultsImage1);
  });

  test('has correct class name', () => {
    const { container } = render(<NoResult />);
    expect(container.firstChild).toHaveClass('noResultsWrapper');
  });
});
