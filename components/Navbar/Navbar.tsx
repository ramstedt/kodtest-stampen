'use client';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

const NavBarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;

  a:hover {
    text-decoration: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  a {
    color: var(--text);
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

interface NavbarProps {
  logoSrc: string;
  logoAlt: string;
  logoHref: string;
  links: { href: string; text: string }[];
}

export default function Navbar({
  logoSrc,
  logoAlt,
  logoHref,
  links,
}: NavbarProps) {
  return (
    <NavBarContainer>
      <LogoWrapper>
        <Link href={logoHref}>
          <Image src={logoSrc} alt={logoAlt} width={90} height={40} />
        </Link>
      </LogoWrapper>
      <NavLinks>
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.text}
          </Link>
        ))}
      </NavLinks>
    </NavBarContainer>
  );
}
