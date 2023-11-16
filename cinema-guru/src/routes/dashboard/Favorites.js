import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../../components/MovieCard'; // Adjust path as necessary
import './dashboard.css';

const Favorites = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('/api/titles/favorite');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching favorite movies', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h1>Movies you like</h1>
      {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
};

export default Favorites;
