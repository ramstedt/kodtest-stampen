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
  fetchCharactersPage,
  selectCharacters,
  selectCharactersListStatus,
  selectCharactersPaging,
} from '@/store/charactersSlice';
import { AppDispatch } from '@/store';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../_atoms/Button/Button';
import Link from 'next/link';
import { slugify } from '@/utils/slugify';
import SearchResultCard from '../SearchResultCard/SearchResultCard';
import SearchResultsWrapper from '../_atoms/SearchResultsWrapper/SearchResultsWrapper';
import PaginationButtons from '../_molecules/PaginationButtons/PaginationButtons';

interface SearchCardProps {
  loadingMsg: string;
  inputPlaceholder: string;
  buttonLabel: string;
  noResultsMsg: string;
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 3rem 0;

  input {
    padding-left: 0.5rem;
    border: 2px solid black;
    height: 2rem;
    width: 15rem;
  }
`;

export default function SearchCard({
  loadingMsg,
  inputPlaceholder,
  buttonLabel,
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

  const { page, totalPages, hasPrev, hasNext } = useSelector(
    selectCharactersPaging
  );

  const errorMsg =
    [filmsError, charactersError].filter(Boolean).join(' • ') || null;

  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  //reset on mount
  useEffect(() => {
    setQuery('');
    setHasSearched(false);
  }, []);
  const { isLoading, error } = useSelector(selectCharactersListStatus);

  const handleSearch = () => {
    const q = query.trim();
    if (q.length > 0) {
      dispatch(fetchFilms(q));
      dispatch(fetchCharactersPage({ page: 1, query: q }));
      setHasSearched(true);
    }
  };

  const goPrev = () => {
    const q = query.trim();
    if (!q) return;
    if (hasPrev && page && page > 1) {
      dispatch(fetchCharactersPage({ page: page - 1, query: q }));
    }
  };

  const goNext = () => {
    const q = query.trim();
    if (!q) return;
    if (hasNext && page && totalPages && page < totalPages) {
      dispatch(fetchCharactersPage({ page: page + 1, query: q }));
    }
  };

  const resultsRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (
      hasSearched &&
      !loadingFilms &&
      !loadingCharacters &&
      !errorMsg &&
      (films.length > 0 || characters.length > 0)
    ) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [
    hasSearched,
    loadingFilms,
    loadingCharacters,
    errorMsg,
    films,
    characters,
  ]);

  return (
    <Wrapper>
      <input
        name='search'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
        placeholder={inputPlaceholder}
      />
      <Button label={buttonLabel} onClick={handleSearch} />

      {(loadingFilms || loadingCharacters) && <p>{loadingMsg}</p>}
      {errorMsg && <p role='alert'>{errorMsg}</p>}
      {hasSearched &&
        !loadingFilms &&
        !loadingCharacters &&
        !errorMsg &&
        films.length === 0 &&
        characters.length === 0 && <p>{noResultsMsg}</p>}
      {hasSearched && (films.length > 0 || characters.length > 0) && (
        <SearchResultsWrapper>
          {films.map((f: Film) => (
            <SearchResultCard
              label={f.title}
              route='/films/'
              key={`film-${f.episode_id}`}
              imgSrc={`/posters/${slugify(f.title)}.jpg`}
              imgAlt={f.title}
              releaseDate={f.release_date}
            />
          ))}

          {characters.map((c: Character) => (
            <SearchResultCard
              label={c.name}
              route='/characters/'
              key={`character-${c.name}`}
              imgSrc='/placeholder.png'
              imgAlt={c.name}
            />
          ))}
          {hasSearched && characters.length > 0 && (
            <li style={{ listStyle: 'none', width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  marginTop: '1rem',
                }}
              >
                <PaginationButtons
                  page={page}
                  totalPages={totalPages}
                  hasPrev={hasPrev}
                  hasNext={hasNext}
                  goPrev={goPrev}
                  goNext={goNext}
                  loading={isLoading}
                />
              </div>
            </li>
          )}
        </SearchResultsWrapper>
      )}
    </Wrapper>
  );
}
