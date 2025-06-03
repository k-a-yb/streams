// TMDB API utility
const API_KEY = process.env.VITE_TMDB_API_KEY || "YOUR_TMDB_API_KEY";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrending = async (type = "all", time = "day") => {
  try {
    const res = await fetch(`${BASE_URL}/trending/${type}/${time}?api_key=${API_KEY}`);
    if (!res.ok) throw new Error('Failed to fetch trending content');
    return res.json();
  } catch (error) {
    console.error('Error fetching trending:', error);
    throw error;
  }
};

export const fetchMovies = async (page = 1) => {
  try {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    if (!res.ok) throw new Error('Failed to fetch movies');
    return res.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchTVShows = async (page = 1) => {
  try {
    const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}`);
    if (!res.ok) throw new Error('Failed to fetch TV shows');
    return res.json();
  } catch (error) {
    console.error('Error fetching TV shows:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    if (!res.ok) throw new Error('Failed to fetch movie details');
    return res.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const fetchTVDetails = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
    if (!res.ok) throw new Error('Failed to fetch TV details');
    return res.json();
  } catch (error) {
    console.error('Error fetching TV details:', error);
    throw error;
  }
};

export const searchTMDB = async (query: string, type = "multi", page = 1) => {
  try {
    const res = await fetch(`${BASE_URL}/search/${type}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
    if (!res.ok) throw new Error('Failed to search TMDB');
    return res.json();
  } catch (error) {
    console.error('Error searching TMDB:', error);
    throw error;
  }
};