'use client';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectVisitedCharacters, Character } from '@/store/charactersSlice';
import { slugify } from '@/utils/slugify';
import Link from 'next/link';
import SearchResultList from '@/components/SearchResultList/SearchResultList';
import PaginationButtons from '@/components/_molecules/PaginationButtons/PaginationButtons';

export default function CharactersPage() {
  const characters = useSelector(selectVisitedCharacters);

  const pageSize = 10;
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(characters.length / pageSize));
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const pagedCharacters = useMemo(() => {
    const start = (page - 1) * pageSize;
    return characters.slice(start, start + pageSize);
  }, [characters, page]);

  const goPrev = () => hasPrev && setPage((p) => p - 1);
  const goNext = () => hasNext && setPage((p) => p + 1);

  return (
    <section>
      <h1>Star Wars Characters</h1>
      {characters.length === 0 && (
        <p style={{ opacity: 0.8 }}>
          This list starts empty. Visit a film to add its characters here.
        </p>
      )}
      <SearchResultList>
        <ul>
          {pagedCharacters.map((character: Character) => (
            <li key={character.name}>
              <Link href={`/characters/${slugify(character.name)}`}>
                {character.name}
              </Link>
            </li>
          ))}
        </ul>
        {totalPages > 1 && (
          <PaginationButtons
            page={page}
            totalPages={totalPages}
            hasPrev={hasPrev}
            hasNext={hasNext}
            goPrev={goPrev}
            goNext={goNext}
            loading={false}
          />
        )}
      </SearchResultList>
    </section>
  );
}
