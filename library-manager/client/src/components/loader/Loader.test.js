import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';
import loadergif from "../../assets/images/loadergif.webp"

describe('Loader Component', () => {
  test('renders loader image', () => {
    render(<Loader />);

    const loaderImage = screen.getByAltText(/loader/i);
    expect(loaderImage).toBeInTheDocument();
    expect(loaderImage).toHaveAttribute('src', loadergif);
  });

  test('has correct class name', () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toHaveClass('loaderWrapper');
  });
});
