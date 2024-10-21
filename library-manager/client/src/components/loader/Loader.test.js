import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader Component', () => {
  test('renders loader image', () => {
    render(<Loader />);

    const loaderImage = screen.getByAltText(/loader/i);
    expect(loaderImage).toBeInTheDocument();
    expect(loaderImage).toHaveAttribute('src', 'https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif');
  });

  test('has correct class name', () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toHaveClass('loaderWrapper');
  });
});
