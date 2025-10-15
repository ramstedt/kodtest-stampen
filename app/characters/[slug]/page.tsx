'use client';
import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import type { AppDispatch } from '@/store';
import { fetchFilms } from '@/store/filmsSlice';
import type { RootState } from '@/store';
import {
  fetchCharacters,
  selectCharacters,
  selectCharactersListStatus,
  selectCharacterWithFilmTitles,
} from '@/store/charactersSlice';
import { slugify, deslugify } from '@/utils/slugify';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';

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
  flex-shrink: 0;
  width: 300px;
  height: 300px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 2rem;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CharacterDetails = styled.div`
  padding: 1.5rem;
  border: 2px solid var(--black);
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

export default function CharacterPage() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchFilms());
  }, [dispatch]);

  const characters = useSelector(selectCharacters);
  const characterBase = useMemo(
    () => characters.find((c) => slugify(c.name) === slug),
    [characters, slug]
  );

  const character = useSelector((state: RootState) =>
    characterBase
      ? selectCharacterWithFilmTitles(characterBase.name)(state)
      : null
  );

  const { isLoading, error } = useSelector(selectCharactersListStatus);

  useEffect(() => {
    if (!character && slug) {
      dispatch(fetchCharacters(deslugify(String(slug))));
    }
  }, [dispatch, slug, character]);

  if (isLoading && !character) return <p>Loading…</p>;
  if (error && !character) return <p role='alert'>{error}</p>;
  if (!isLoading && !character) return <p>Not found.</p>;

  return (
    <Container>
      <ImageWrapper>
        <Image
          src='/placeholder.png'
          alt={character?.name ?? 'Character image'}
          width={300}
          height={300}
          style={{ objectFit: 'cover' }}
        />
      </ImageWrapper>

      <ContentWrapper>
        <h1>{character?.name}</h1>
        <CharacterDetails>
          {character?.height && (
            <DetailRow>
              <span>Height:</span> {character.height}
            </DetailRow>
          )}
          {character?.mass && (
            <DetailRow>
              <span>Mass:</span> {character.mass}
            </DetailRow>
          )}
          {character?.hair_color && (
            <DetailRow>
              <span>Hair Color:</span> {character.hair_color}
            </DetailRow>
          )}
          {character?.skin_color && (
            <DetailRow>
              <span>Skin Color:</span> {character.skin_color}
            </DetailRow>
          )}
          {character?.eye_color && (
            <DetailRow>
              <span>Eye Color:</span> {character.eye_color}
            </DetailRow>
          )}
          {character?.birth_year && (
            <DetailRow>
              <span>Birth Year:</span> {character.birth_year}
            </DetailRow>
          )}
          {character?.gender && (
            <DetailRow>
              <span>Gender:</span> {character.gender}
            </DetailRow>
          )}
          {character?.filmTitles && character.filmTitles.length > 0 && (
            <DetailRow>
              <span>Films:</span>
              {character.filmTitles.map((title, i) => (
                <>
                  <Link key={title} href={`/films/${slugify(title)}`}>
                    {title}
                  </Link>
                  {i < character.filmTitles.length - 1 && ', '}
                </>
              ))}
            </DetailRow>
          )}
        </CharacterDetails>
      </ContentWrapper>
    </Container>
  );
}
