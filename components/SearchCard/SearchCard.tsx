'use client';
import { useDispatch, useSelector } from 'react-redux';
import {
  Film,
  fetchFilms,
  selectFilms,
  selectFilmsListStatus,
} from '@/store/filmsSlice';
import {
  Character,
  fetchCharacters,
  selectCharacters,
  selectCharactersListStatus,
} from '@/store/charactersSlice';
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
  const characters = useSelector(selectCharacters);
  const { isLoading: loadingCharacters, error: charactersError } = useSelector(
    selectCharactersListStatus
  );

  // Combine possible errors from films and characters into one string
  const errorMsg =
    [filmsError, charactersError].filter(Boolean).join(' • ') || null;

  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    const q = query.trim();
    if (q.length > 0) {
      dispatch(fetchFilms(q));
      dispatch(fetchCharacters(q));
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
        placeholder={inputPlaceholder}
      />
      <button onClick={handleSearch}>{inputPlaceholder}</button>

      {(loadingFilms || loadingCharacters) && <p>{loadingMsg}</p>}
      {errorMsg && <p role='alert'>{errorMsg}</p>}
      {hasSearched &&
        !loadingFilms &&
        !loadingCharacters &&
        !errorMsg &&
        films.length === 0 &&
        characters.length === 0 && <p>{noResultsMsg}</p>}
      {(films.length > 0 || characters.length > 0) && (
        <ul>
          {films.map((film: Film) => (
            <li key={`film-${film.episode_id}`}>{film.title}</li>
          ))}
          {characters.map((c: Character) => (
            <li key={`char-${c.url}`}>{c.name}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
