import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../../components/MovieCard'; // Adjust path as necessary
import Filter from '../../components/Filter';       // Adjust path as necessary
import Button from '../../components/Button';       // Adjust path as necessary
import './dashboard.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState('');
  const [title, setTitle] = useState('');
  const [page, setPage] = useState(1);

  const loadMovies = async (page) => {
    try {
      const response = await axios.get('/api/titles/advancedsearch', {
        params: { minYear, maxYear, genres, title, sort, page }
      });
      setMovies([...movies, ...response.data.titles]);
    } catch (error) {
      console.error('Error loading movies', error);
    }
  };

  useEffect(() => {
    loadMovies(page);
  }, [minYear, maxYear, genres, title, sort, page]);

  return (
    <div>
      <Filter
        minYear={minYear} setMinYear={setMinYear}
        maxYear={maxYear} setMaxYear={setMaxYear}
        genres={genres} setGenres={setGenres}
        sort={sort} setSort={setSort}
        title={title} setTitle={setTitle}
      />
      {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      <Button text="Load More.." onClick={() => setPage(page + 1)} />
    </div>
  );
};

export default HomePage;
