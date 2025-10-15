'use client';
import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import type { AppDispatch, RootState } from '@/store';
import {
  fetchFilms,
  selectFilms,
  selectFilmsListStatus,
} from '@/store/filmsSlice';
import { slugify, deslugify } from '@/utils/slugify';
import Image from 'next/image';
import styled from 'styled-components';
import {
  fetchCharactersByUrls,
  selectVisitedCharacters,
} from '@/store/charactersSlice';
import Spinner from '@/components/_atoms/Spinner/Spinner';

const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 300px;
  height: 420px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 768px) {
    margin-right: 2rem;
  }
`;

const PosterFallback = styled.div`
  position: absolute;
  inset: 0;
  border: 2px solid var(--black);
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FilmDetails = styled.div`
  border: 2px solid var(--black);
  padding: 1.5rem;
  line-height: 1.6;
`;

const DetailRow = styled.p`
  margin: 0.4rem 0;
  font-size: 1rem;
  span {
    font-weight: bold;
    margin-right: 0.25rem;
  }
`;

export default function FilmPage() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const films = useSelector(selectFilms);
  const { isLoading, error } = useSelector(selectFilmsListStatus);
  const visitedCharacters = useSelector(selectVisitedCharacters);

  const visitedByUrl = useMemo(() => {
    const map = new Map<string, { name: string; url: string }>();
    for (const c of visitedCharacters) map.set(c.url, c);
    return map;
  }, [visitedCharacters]);
  const film = useMemo(
    () => films.find((f) => slugify(f.title) === slug),
    [films, slug]
  );
  const allCharNamesLoaded = useMemo(() => {
    if (!film?.characters) return true;
    return film.characters.every((u) => visitedByUrl.has(u));
  }, [film?.characters, visitedByUrl]);

  useEffect(() => {
    if (!film && slug) {
      const query = deslugify(String(slug));
      dispatch(fetchFilms(query));
    }
  }, [dispatch, slug, film]);

  useEffect(() => {
    if (film?.characters?.length) {
      dispatch(fetchCharactersByUrls(film.characters));
    }
  }, [dispatch, film?.characters]);

  if (isLoading && !film)
    return (
      <p>
        <Spinner />
      </p>
    );
  if (error && !film) return <p role='alert'>{error}</p>;
  if (!film) return <p>Not found.</p>;

  return (
    <Container>
      <ImageWrapper>
        <Image
          src={`/posters/${slug}.jpg`}
          alt={film.title}
          width={300}
          height={420}
          style={{ objectFit: 'cover', borderRadius: 8 }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <PosterFallback aria-hidden />
      </ImageWrapper>

      <ContentWrapper>
        <h1>{film.title}</h1>
        <FilmDetails>
          <DetailRow>
            <span>Episode:</span> {film.episode_id}
          </DetailRow>
          <DetailRow>
            <span>Release date:</span> {film.release_date}
          </DetailRow>
          <DetailRow>
            <span>Director:</span> {film.director}
          </DetailRow>
          <DetailRow>
            <span>Producer:</span> {film.producer}
          </DetailRow>

          {film.characters && film.characters.length > 0 && (
            <DetailRow>
              <span>Characters:</span>{' '}
              {!allCharNamesLoaded ? (
                <Spinner />
              ) : (
                film.characters.map((url, idx) => {
                  const name = visitedByUrl.get(url)?.name as string;
                  return (
                    <span key={url}>
                      <a href={`/characters/${slugify(name)}`}>{name}</a>
                      {idx < film.characters.length - 1 && ', '}
                    </span>
                  );
                })
              )}
            </DetailRow>
          )}
        </FilmDetails>
      </ContentWrapper>
    </Container>
  );
}
