import SearchCard from '@/components/SearchCard/SearchCard';

export default function Home() {
  return (
    <main>
      <SearchCard
        loadingMsg='loading'
        inputPlaceholder='Search'
        noResultsMsg='No films found'
      />
    </main>
  );
}
