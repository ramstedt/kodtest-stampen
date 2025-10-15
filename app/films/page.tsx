'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store';
import {
  fetchFilms,
  selectFilms,
  selectFilmsListStatus,
  Film,
} from '@/store/filmsSlice';
import { slugify } from '@/utils/slugify';
import Link from 'next/link';

export default function FilmsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const films = useSelector(selectFilms);
  const { isLoading, error } = useSelector(selectFilmsListStatus);

  useEffect(() => {
    if (films.length === 0) {
      dispatch(fetchFilms(undefined));
    }
  }, [dispatch, films.length]);

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p role='alert'>{error}</p>;

  return (
    <section>
      <h1>Star Wars Films</h1>
      <ul>
        {films.map((film: Film) => (
          <li key={film.episode_id}>
            <Link href={`/films/${slugify(film.title)}`}>
              {film.title} ({film.release_date})
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
