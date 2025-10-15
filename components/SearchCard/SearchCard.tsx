'use client';
import { useDispatch, useSelector } from 'react-redux';
import {
  Film,
  fetchFilms,
  selectFilms,
  selectFilmsListStatus,
} from '@/store/filmsSlice';
import { AppDispatch } from '@/store';
import { useState } from 'react';

interface SearchCardProps {
  loadingMsg: string;
  inputPlaceholder: string;
  noResultsMsg: string;
}

export default function SearchCard({
  loadingMsg,
  inputPlaceholder,
  noResultsMsg,
}: SearchCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const films = useSelector(selectFilms);
  const { isLoading: loadingFilms, error: filmsError } = useSelector(
    selectFilmsListStatus
  );
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (query.trim().length > 0) {
      dispatch(fetchFilms(query));
      setHasSearched(true);
    }
  };

  return (
    <section>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
        placeholder='Search films'
      />
      <button onClick={handleSearch}>{inputPlaceholder}</button>

      {loadingFilms && <p>{loadingMsg}</p>}
      {filmsError && <p role='alert'>{filmsError}</p>}
      {hasSearched && !loadingFilms && !filmsError && films.length === 0 && (
        <p>{noResultsMsg}</p>
      )}
      {films.length > 0 && (
        <ul>
          {films.map((film: Film) => (
            <li key={film.episode_id}>{film.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
