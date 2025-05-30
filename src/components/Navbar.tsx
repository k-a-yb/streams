import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  onConnectWallet: () => void;
  isConnected?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onConnectWallet, isConnected = false }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleConnect = () => {
    onConnectWallet();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#131a2b] shadow-md sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link to="/dashboard" className="text-xl font-bold text-white">
          <span className="text-blue-400">Sui</span> Stream
        </Link>
        <Link to="/movies" className="text-white hover:text-blue-400 transition">Movies</Link>
        <Link to="/tvshows" className="text-white hover:text-blue-400 transition">TV Shows</Link>
        <Link to="/collection" className="text-white hover:text-blue-400 transition">My Collection</Link>
      </div>
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="rounded bg-[#19223a] text-white px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button type="submit" className="text-blue-400 font-semibold hover:underline">Search</button>
      </form>
      <div>
        {isConnected ? (
          <button className="bg-blue-600 text-white px-4 py-2 rounded font-semibold cursor-default" disabled>
            Wallet Connected
          </button>
        ) : (
          <button onClick={handleConnect} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition">
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
