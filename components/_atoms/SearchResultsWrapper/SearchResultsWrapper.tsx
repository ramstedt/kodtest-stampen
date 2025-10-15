'use client';
import styled from 'styled-components';

interface SearchResultsWrapperProps {
  children: React.ReactNode;
}

const Wrapper = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  justify-items: center;
`;

export default function SearchResultsWrapper({
  children,
}: SearchResultsWrapperProps) {
  return <Wrapper>{children}</Wrapper>;
}
