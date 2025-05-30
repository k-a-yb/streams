import { useState, useEffect } from "react";
import PlayerModal from "./PlayerModal";

const CollectionGrid = () => {
  const [collection, setCollection] = useState<any[]>([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("myCollection");
    setCollection(stored ? JSON.parse(stored) : []);
  }, []);

  return (
    <section className="py-8 px-4">
      <h2 className="text-2xl font-bold mb-4 text-white">My Collection</h2>
      {collection.length === 0 ? (
        <p className="text-gray-400">No saved movies or shows yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {collection.map((item: any) => (
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
          id={selected.id}
          type={selected.media_type || "movie"}
          title={selected.title || selected.name}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
};

export default CollectionGrid;
