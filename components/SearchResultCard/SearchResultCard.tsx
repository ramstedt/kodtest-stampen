'use client';
import { slugify } from '@/utils/slugify';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

interface SearchResultCardProps {
  label: string;
  route: string;
  key: string;
  imgSrc: string;
  imgAlt: string;
  releaseDate?: string;
}

const Wrapper = styled.section`
  width: 300px;
  height: 400px;
  border: 2px solid var(--black);
  padding: 1rem;
  color: var(--black);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 290px;
  height: 340px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export default function SearchResultCard({
  label,
  route,
  key,
  imgSrc,
  imgAlt,
  releaseDate,
}: SearchResultCardProps) {
  return (
    <Wrapper>
      <ImageContainer>
        <Image src={imgSrc} alt={imgAlt} width={290} height={340} />
      </ImageContainer>
      <div>
        <Link key={key} href={`${route}${slugify(label)}`}>
          {label}
        </Link>
      </div>
      <div>{releaseDate && <small>({releaseDate})</small>}</div>
    </Wrapper>
  );
}
