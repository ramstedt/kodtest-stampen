'use client';
import Button from '@/components/_atoms/Button/Button';
import React from 'react';

export interface PaginationButtonsProps {
  prevLabel?: string;
  nextLabel?: string;
  page: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
  goPrev: () => void;
  goNext: () => void;
  loading?: boolean;
  className?: string;
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
