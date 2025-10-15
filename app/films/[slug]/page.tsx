'use client';
import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import type { AppDispatch } from '@/store';
import {
  fetchFilms,
  selectFilms,
  selectFilmsListStatus,
} from '@/store/filmsSlice';
import { slugify, deslugify } from '@/utils/slugify';

export default function FilmPage() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const films = useSelector(selectFilms);
  const { isLoading, error } = useSelector(selectFilmsListStatus);

  const film = useMemo(
    () => films.find((f) => slugify(f.title) === slug),
    [films, slug]
  );

  useEffect(() => {
    if (!film && slug) {
      const query = deslugify(String(slug));
      dispatch(fetchFilms(query));
    }
  }, [dispatch, slug, film]);

  if (isLoading && !film) return <p>Loading…</p>;
  if (error && !film) return <p role='alert'>{error}</p>;
  //TODO: 404 page
  if (!film) return <p>Not found.</p>;

  return (
    <article>
      <h1>{film.title}</h1>
    </article>
  );
}
