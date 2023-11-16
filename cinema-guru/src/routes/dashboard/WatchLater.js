import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../../components/MovieCard'; // Adjust path as necessary
import './dashboard.css';

const WatchLater = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchWatchLater = async () => {
      try {
        const response = await axios.get('/api/titles/watchlater');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching watch later movies', error);
      }
    };

    fetchWatchLater();
  }, []);

  return (
    <div>
      <h1>Movies to Watch Later</h1>
      {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
};

export default WatchLater;
