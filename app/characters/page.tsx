'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store';
import {
  fetchCharactersPage,
  selectCharacters,
  selectCharactersListStatus,
  selectCharactersPaging,
  Character,
} from '@/store/charactersSlice';
import { slugify } from '@/utils/slugify';
import Link from 'next/link';
import Button from '@/components/_atoms/Button/Button';
import SearchResultList from '@/components/SearchResultList/SearchResultList';
import PaginationButtons from '@/components/_molecules/PaginationButtons/PaginationButtons';

export default function CharactersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const characters = useSelector(selectCharacters);
  const { isLoading, error } = useSelector(selectCharactersListStatus);
  const { page, totalPages, hasPrev, hasNext } = useSelector(
    selectCharactersPaging
  );

  useEffect(() => {
    dispatch(fetchCharactersPage({ page: 1 }));
  }, [dispatch]);

  const goPrev = () => {
    if (hasPrev && page > 1) dispatch(fetchCharactersPage({ page: page - 1 }));
  };

  const goNext = () => {
    if (hasNext && page < totalPages)
      dispatch(fetchCharactersPage({ page: page + 1 }));
  };

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p role='alert'>{error}</p>;

  return (
    <section>
      <h1>Star Wars Characters</h1>
      <SearchResultList>
        <ul>
          {characters.map((character: Character) => (
            <li key={character.name}>
              <Link href={`/characters/${slugify(character.name)}`}>
                {character.name}
              </Link>
            </li>
          ))}
        </ul>
      </SearchResultList>

      <PaginationButtons
        page={page}
        totalPages={totalPages}
        hasPrev={hasPrev}
        hasNext={hasNext}
        goPrev={goPrev}
        goNext={goNext}
        loading={isLoading}
      />
    </section>
  );
}
