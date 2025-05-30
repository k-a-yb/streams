import { useEffect, useState } from "react";
import { fetchMovies } from "../lib/tmdb";
import PlayerModal from "./PlayerModal";

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchMovies().then(data => setMovies(data.results || []));
  }, []);

  return (
    <section className="py-8 px-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Popular Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((item: any) => (
          <div
            key={item.id}
            className="bg-[#1a2236] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition cursor-pointer"
            onClick={() => setSelected(item)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-2">
              <h3 className="text-lg font-semibold text-white truncate">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.release_date}</p>
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <PlayerModal
          id={selected.id}
          type="movie"
          title={selected.title}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
};

export default MovieGrid;
