import { useEffect, useState } from "react";
import { searchTMDB } from "../lib/tmdb";
import PlayerModal from "./PlayerModal";

interface SearchResultsProps {
  query: string;
}

interface TMDBResult {
  id: number;
  poster_path?: string;
  title?: string;
  name?: string;
  overview?: string;
  media_type: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  backdrop_path?: string;
  original_language?: string;
  popularity?: number;
  vote_count?: number;
  video?: boolean;
  adult?: boolean;
  original_title?: string;
  original_name?: string;
  // For TV shows
  origin_country?: string[];
  genre_ids?: number[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const [results, setResults] = useState<TMDBResult[]>([]);
  const [selected, setSelected] = useState<TMDBResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        const data = await searchTMDB(query);
        setResults(data.results || []);
      } catch (err) {
        console.error('Error searching TMDB:', err);
        setError('Failed to fetch search results');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchResults, 500);
    
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <section className="py-4 px-4">
      <h2 className="text-2xl font-bold mb-4 text-white">
        {query ? `Results for "${query}"` : 'Search for movies and TV shows'}
      </h2>
      {isLoading ? (
        <p className="text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : results.length === 0 ? (
        <p className="text-gray-400">
          {query ? 'No results found. Try a different search term.' : 'Enter a search term to find movies and TV shows'}
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.map((item) => (
            <div
              key={item.id}
              className="bg-[#1a2236] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition cursor-pointer"
              onClick={() => setSelected(item)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-2">
                <h3 className="text-lg font-semibold text-white truncate">{item.title || item.name}</h3>
                <p className="text-gray-400 text-sm">{item.release_date || item.first_air_date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {selected && (
        <PlayerModal
          id={selected.id.toString()}
          type={selected.media_type}
          title={selected.title || selected.name || 'Untitled'}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
};

export default SearchResults;
