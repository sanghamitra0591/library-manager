import React from 'react';
import { render, screen } from '@testing-library/react';
import NoResultFull from './NoResultFull';
import noResultsImage1 from "../../assets/images/no-result-found.png"

describe('NoResultFull Component', () => {
  test('renders no results image', () => {
    render(<NoResultFull />);

    const noResultsImage = screen.getByAltText(/no results/i);
    expect(noResultsImage).toBeInTheDocument();
    expect(noResultsImage).toHaveAttribute('src', noResultsImage1);
  });

  test('has correct class name', () => {
    const { container } = render(<NoResultFull />);
    expect(container.firstChild).toHaveClass('noResultsWrapperFull');
  });
});
