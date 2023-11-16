import React from 'react';
import SearchBar from '../general/SearchBar';
import SelectInput from '../general/SelectInput';
import Input from '../general/Input';
import Tag from './Tag';
import './movies.css';

const Filter = ({
  minYear, setMinYear, maxYear, setMaxYear,
  sort, setSort, genres, setGenres, title, setTitle
}) => {
  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'highestrated', label: 'Highest Rated' },
    { value: 'lowestrated', label: 'Lowest Rated' }
  ];

  return (
    <div className="filter-container">
      <SearchBar title={title} setTitle={setTitle} />
      <Input label="Min Year" type="number" value={minYear} setValue={setMinYear} />
      <Input label="Max Year" type="number" value={maxYear} setValue={setMaxYear} />
      <SelectInput label="Sort By" options={sortOptions} value={sort} setValue={setSort} />
      {['action', 'drama', 'comedy', 'biography', 'romance', 'thriller', 'war', 'history', 'sport', 'sci-fi', 'documentary', 'crime', 'fantasy'].map((genre) => (
        <Tag key={genre} genre={genre} filter={true} genres={genres} setGenres={setGenres} />
      ))}
    </div>
  );
};

export default Filter;
