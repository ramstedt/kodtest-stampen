'use client';
import styled from 'styled-components';
import Image from 'next/image';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  h1 {
    text-align: center;
    &:hover {
      text-decoration: none;
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const Title = styled.div`
  position: relative;
  text-align: center;
  margin: 0 auto;
  padding: 1rem 0;
  width: fit-content;

  h1 {
    margin: 0.5rem 0;
  }
`;
const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;

  @media (min-width: 768px) {
    width: 60%;
    height: 70vh;
    max-width: 800px;
    max-height: 891px;
  }
`;

interface HeroProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  ingress?: string;
}

export default function Hero({
  title,
  imageSrc,
  imageAlt,
  ingress = '',
}: HeroProps) {
  return (
    <Section>
      <Title>
        <h1>{title}</h1>
        <div>{ingress}</div>
      </Title>
      <ImgWrapper>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          style={{ objectFit: 'contain' }}
        />
      </ImgWrapper>
    </Section>
  );
}
