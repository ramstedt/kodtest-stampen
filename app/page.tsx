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

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const films = useSelector(selectFilms);
  const { isLoading: loadingFilms, error: filmsError } = useSelector(
    selectFilmsListStatus
  );

  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim().length > 0) {
      dispatch(fetchFilms(query));
    }
  };

  return (
    <main>
      <div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          placeholder='Search films'
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <section style={{ marginTop: '1rem' }}>
        {loadingFilms && <p>Loading...</p>}
        {filmsError && <p role='alert'>{filmsError}</p>}
        {!loadingFilms && !filmsError && films.length === 0 && (
          <p>No films found</p>
        )}
        {films.length > 0 && (
          <ul>
            {films.map((film: Film) => (
              <li key={film.episode_id}>{film.title}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
