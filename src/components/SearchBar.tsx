import { useState } from "react";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState("");
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSearch(query);
      }}
      className="flex items-center gap-2 my-4 justify-center"
    >
      <input
        type="text"
        placeholder="Search for movies or TV shows..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="rounded bg-[#19223a] text-white px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
