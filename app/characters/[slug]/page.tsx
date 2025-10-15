'use client';
import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import type { AppDispatch } from '@/store';
import {
  fetchCharacters,
  selectCharacters,
  selectCharactersListStatus,
} from '@/store/charactersSlice';
import { slugify, deslugify } from '@/utils/slugify';

export default function CharacterPage() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const characters = useSelector(selectCharacters);
  const { isLoading, error } = useSelector(selectCharactersListStatus);

  const character = useMemo(
    () => characters.find((c) => slugify(c.name) === slug),
    [characters, slug]
  );

  useEffect(() => {
    if (!character && slug) {
      const q = deslugify(String(slug));
      dispatch(fetchCharacters(q));
    }
  }, [dispatch, slug, character]);

  if (isLoading && !character) return <p>Loading…</p>;
  if (error && !character) return <p role='alert'>{error}</p>;
  //TODO: 404 page
  if (!character) return <p>Not found.</p>;

  return (
    <article>
      <h1>{character.name}</h1>
    </article>
  );
}
