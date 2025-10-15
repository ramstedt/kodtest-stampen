'use client';
import React from 'react';
import styled from 'styled-components';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isLoading?: boolean;
}

const Btn = styled.button`
  text-transform: uppercase;
  font-weight: 700;
  border-radius: 29px 29px 29px 0px;
  width: fit-content;
  padding: 0 2rem;
  height: 43px;
  margin: 0 auto;
  margin-top: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--black);
  background-color: var(--grey);
  border: 2px solid var(--black);

  &:hover {
    color: var(--white);
    background-color: var(--black);
    border-color: var(--white);
  }
`;

export default function Button({
  label,
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <Btn {...props} disabled={isLoading || disabled}>
      {label}
    </Btn>
  );
}
