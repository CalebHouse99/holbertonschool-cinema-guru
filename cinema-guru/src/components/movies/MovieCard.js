import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './movies.css';

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken'); // Directly retrieve the token
        const favoriteResponse = await axios.get('/api/titles/favorite', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        const watchLaterResponse = await axios.get('/api/titles/watchlater', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });

        setIsFavorite(favoriteResponse.data.some(fav => fav.imdbId === movie.imdbId));
        setIsWatchLater(watchLaterResponse.data.some(wl => wl.imdbId === movie.imdbId));
      } catch (error) {
        console.error('Error fetching statuses', error);
      }
    };

    checkStatus();
  }, [movie]);

  const handleFavoriteClick = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      let response;
      if (isFavorite) {
        response = await axios.delete('/api/titles/favorite', {
          headers: { Authorization: `Bearer ${accessToken}` },
          data: { imdbId: movie.imdbId }
        });
      } else {
        response = await axios.post('/api/titles/favorite', {
          imdbId: movie.imdbId
        }, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorite status', error);
    }
  };

  const handleWatchLaterClick = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      let response;
      if (isWatchLater) {
        response = await axios.delete('/api/titles/watchlater', {
          headers: { Authorization: `Bearer ${accessToken}` },
          data: { imdbId: movie.imdbId }
        });
      } else {
        response = await axios.post('/api/titles/watchlater', {
          imdbId: movie.imdbId
        }, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
      }
      setIsWatchLater(!isWatchLater);
    } catch (error) {
      console.error('Error updating watch later status', error);
    }
  };

  return (
    <li className="movie-card">
      <h3>{movie.title}</h3>
      <p>{movie.synopsis}</p>
      {movie.genres.map((genre, index) => (
        <span key={index}>{genre}</span>
      ))}
      <button onClick={handleFavoriteClick}>
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
      <button onClick={handleWatchLaterClick}>
        {isWatchLater ? 'Remove from Watch Later' : 'Add to Watch Later'}
      </button>
    </li>
  );
};

export default MovieCard;
