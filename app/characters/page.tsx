'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store';
import {
  fetchCharacters,
  selectCharacters,
  selectCharactersListStatus,
  Character,
} from '@/store/charactersSlice';
import { slugify } from '@/utils/slugify';
import Link from 'next/link';

export default function CharactersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const characters = useSelector(selectCharacters);
  const { isLoading, error } = useSelector(selectCharactersListStatus);

  useEffect(() => {
    if (characters.length === 0) {
      dispatch(fetchCharacters(undefined));
    }
  }, [dispatch, characters.length]);

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p role='alert'>{error}</p>;

  return (
    <section>
      <h1>Star Wars Characters</h1>
      <ul>
        {characters.map((character: Character) => (
          <li key={character.name}>
            <Link href={`/characters/${slugify(character.name)}`}>
              {character.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
