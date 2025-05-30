const PlayerModal = ({ id, type, title, onClose }: { id: string | number, type: string, title: string, onClose: () => void }) => {
  const src = type === "tv"
    ? `https://vidsrc.xyz/embed/tv/${id}`
    : `https://vidsrc.xyz/embed/movie/${id}`;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-[#131a2b] rounded-lg p-4 max-w-3xl w-full relative">
        <button
          className="absolute top-2 right-2 text-white text-2xl font-bold hover:text-red-500"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-white">{title}</h2>
        <div className="aspect-w-16 aspect-h-9 w-full">
          <iframe
            src={src}
            title={title}
            allowFullScreen
            className="w-full h-96 rounded-lg border-none"
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;
