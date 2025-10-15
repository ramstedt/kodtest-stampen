import Image from 'next/image';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
  img {
    animation: ${spin} 1s linear infinite;
    width: 48px;
    height: 48px;
  }
`;

export default function Spinner() {
  return (
    <SpinnerWrapper>
      <Image src='/spinner.svg' alt='Loading...' width={48} height={48} />
    </SpinnerWrapper>
  );
}
