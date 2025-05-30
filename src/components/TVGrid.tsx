import { useEffect, useState } from "react";
import { fetchTVShows } from "../lib/tmdb";
import PlayerModal from "./PlayerModal";

const TVGrid = () => {
  const [shows, setShows] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchTVShows().then(data => setShows(data.results || []));
  }, []);

  return (
    <section className="py-8 px-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Popular TV Shows</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {shows.map((item: any) => (
          <div
            key={item.id}
            className="bg-[#1a2236] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition cursor-pointer"
            onClick={() => setSelected(item)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-2">
              <h3 className="text-lg font-semibold text-white truncate">{item.name}</h3>
              <p className="text-gray-400 text-sm">{item.first_air_date}</p>
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <PlayerModal
          id={selected.id}
          type="tv"
          title={selected.name}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
};

export default TVGrid;
