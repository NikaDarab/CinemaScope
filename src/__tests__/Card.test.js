import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../components/Card';

describe('Card', () => {
  const movie = {
    Title: 'The Matrix',
    Poster: 'https://www.example.com/matrix-poster.jpg',
    Plot: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    Director: 'Lana Wachowski, Lilly Wachowski',
    Genre: 'Action, Sci-Fi',
    Released: '31 Mar 1999',
    imdbRating: '8.7',
    Ratings: [
      {
        Source: 'Internet Movie Database',
        Value: '8.7/10'
      },
      {
        Source: 'Rotten Tomatoes',
        Value: '88%'
      }
    ]
  };

  it('should render the movie details in a modal', () => {
    render(<Card movie={movie} showModal={true} setShowModal={jest.fn()} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://www.example.com/matrix-poster.jpg');
    expect(screen.getByText('A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.')).toBeInTheDocument();
    expect(screen.getByText('Director:')).toBeInTheDocument();
    expect(screen.getByText('Lana Wachowski, Lilly Wachowski')).toBeInTheDocument();
    expect(screen.getByText('Genre:')).toBeInTheDocument();
    expect(screen.getByText('Action, Sci-Fi')).toBeInTheDocument();
    expect(screen.getByText('Release Date:')).toBeInTheDocument();
    expect(screen.getByText('31 Mar 1999')).toBeInTheDocument();
    expect(screen.getByText('IMDb Rating:')).toBeInTheDocument();
    expect(screen.getByText('8.7')).toBeInTheDocument();
    expect(screen.getByText('Rotten Tomatoes:')).toBeInTheDocument();
    expect(screen.getByText('88%')).toBeInTheDocument();
  });
});
