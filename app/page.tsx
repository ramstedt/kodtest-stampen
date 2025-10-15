import Hero from '@/components/Hero/Hero';
import SearchCard from '@/components/SearchCard/SearchCard';

export default function Home() {
  return (
    <main>
      <SearchCard
        loadingMsg='loading'
        inputPlaceholder='Search for film or character'
        buttonLabel='Search'
        noResultsMsg='Nothing was found'
      />
    </main>
  );
}
