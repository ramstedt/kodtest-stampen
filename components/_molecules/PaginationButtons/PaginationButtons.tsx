'use client';
import Button from '@/components/_atoms/Button/Button';
import React from 'react';

export interface PaginationButtonsProps {
  /** Text for the previous button (default: "Prev") */
  prevLabel?: string;
  /** Text for the next button (default: "Next") */
  nextLabel?: string;
  /** Current page (1-based) */
  page: number;
  /** Total number of pages */
  totalPages: number;
  /** Whether there is a previous page */
  hasPrev: boolean;
  /** Whether there is a next page */
  hasNext: boolean;
  /** Handler for clicking previous */
  goPrev: () => void;
  /** Handler for clicking next */
  goNext: () => void;
  /** Optional: disable interactions while loading */
  loading?: boolean;
  /** Optional className passthrough */
  className?: string;
  /** Optional style passthrough */
  style?: React.CSSProperties;
}

export default function PaginationButtons({
  prevLabel = 'Prev',
  nextLabel = 'Next',
  page,
  totalPages,
  hasPrev,
  hasNext,
  goPrev,
  goNext,
  loading = false,
  className,
  style,
}: PaginationButtonsProps) {
  const disablePrev = loading || !hasPrev;
  const disableNext = loading || !hasNext;

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        gap: '1rem',
        marginTop: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
        ...(style || {}),
      }}
    >
      <Button label={prevLabel} onClick={goPrev} disabled={disablePrev} />
      <span>
        Page {page} / {totalPages}
      </span>
      <Button label={nextLabel} onClick={goNext} disabled={disableNext} />
    </div>
  );
}
