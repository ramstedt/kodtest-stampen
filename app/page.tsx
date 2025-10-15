import Hero from '@/components/Hero/Hero';
import SearchCard from '@/components/SearchCard/SearchCard';

export default function Home() {
  return (
    <main>
      <Hero
        title='Star Wars Wiki'
        imageSrc='/images/darth-vader.png'
        imageAlt=''
        ingress='This IS the page you are looking for'
      />
      <SearchCard
        loadingMsg='loading'
        inputPlaceholder='Search for film or character'
        buttonLabel='Search'
        noResultsMsg='Nothing was found'
      />
    </main>
  );
}
