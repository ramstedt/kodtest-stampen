'use client';
import { slugify } from '@/utils/slugify';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

interface SearchResultListProps {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  width: fit-content;

  padding: 2rem;
  color: var(--black);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

export default function SearchResultList({ children }: SearchResultListProps) {
  return <Wrapper>{children}</Wrapper>;
}
