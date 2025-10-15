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
import SearchResultList from '@/components/SearchResultList/SearchResultList';
import Spinner from '@/components/_atoms/Spinner/Spinner';

export default function FilmsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const films = useSelector(selectFilms);
  const { isLoading, error } = useSelector(selectFilmsListStatus);

  useEffect(() => {
    dispatch(fetchFilms(undefined));
  }, [dispatch]);

  if (isLoading) {
    return (
      <section>
        <h1>Star Wars Films</h1>
        <p>
          <Spinner />
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h1>Star Wars Films</h1>
        <p role='alert'>{error}</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Star Wars Films</h1>
      {!films.length ? (
        <p>
          <Spinner />
        </p>
      ) : (
        <SearchResultList>
          <ul>
            {films.map((film: Film) => (
              <li key={film.episode_id}>
                <Link href={`/films/${slugify(film.title)}`}>
                  {film.title} ({film.release_date})
                </Link>
              </li>
            ))}
          </ul>
        </SearchResultList>
      )}
    </section>
  );
}
