import axios from "axios";

const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `3d673b2d8e40eafc68577fae5a6a1f4b`;
const TRENDING_URL = `${BASE_URL}/trending/all/day?api_key=${API_KEY}&include_adult=false`;
const MOVIE_BY_SEARCH = `${BASE_URL}/search/movie?api_key=${API_KEY}&include_adult=false`;
const MOVIE_BY_ID = `${BASE_URL}/movie`;

const fetchTrending = async (page = 1) => {
  const url = `${TRENDING_URL}&page=${page}`;
  const response = await fetch(url);
  return await response.json();
};



const fetchMoviesBySearch = async (searchQuery, page) => {
  const url = `${MOVIE_BY_SEARCH}&query=${searchQuery}&page=${page}`;
  const response = await fetch(url);
  return await response.json();
};

const fetchFullInfoOfMovie = async movieId => {
  const url = `${MOVIE_BY_ID}/${movieId}?api_key=${API_KEY}`;
  const response = await fetch(url);
  return await response.json();
};

const fetchMovieCast = movieId => {
  const url = `${MOVIE_BY_ID}/${movieId}/credits?api_key=${API_KEY}`;
  return fetch(url).then(response => response.json());
};

const fetchMovieReview = movieId => {
  const url = `${MOVIE_BY_ID}/${movieId}/reviews?api_key=${API_KEY}`;
  return fetch(url).then(response => response.json());
};

export {
  fetchTrending,
  fetchMoviesBySearch,
  fetchFullInfoOfMovie,
  fetchMovieCast,
  fetchMovieReview,
};

export const fetcher = (url) => fetch(url).then((res) => res.json());
export const REACT_APP_URL = "https://tl-movie.vercel.app";
export const REACT_APP_FACEBOOK_APP_ID = '3108322012762887'
const apiKey = "1a763884400befdbd957d043e8e9e19c";
const API_domain = `https://api.themoviedb.org/3`;

// export const API = {
//   getMoviebyID: (id) => `${API_domain}/${id}?api_key=${apiKey}`,
//   getMovieSearch: (query) =>
//     `${API_domain}/search/movie?api_key=${apiKey}&query=${query}`,
//   getMovieList: (type, page = 1, mediaType = "all") => {
//     return type === "popular" || type === "top_rated" || type === "now_playing"
//       ? `${API_domain}/${mediaType}/${type}?api_key=${apiKey}&page=${page}`
//       : type === "discover"
//       ? ` ${API_domain}/${type}/${mediaType}?api_key=${apiKey}&page=${page}`
//       : ` ${API_domain}/${type}/${mediaType}/day?api_key=${apiKey}&page=${page}`;
//   },

//   getMovieDetail: (movieId, mediaType = "movie") =>
//     `${API_domain}/${mediaType}/${movieId}?api_key=${apiKey}`,
//   getImageUrl: (backdrop_path, size = "original") =>
//     `https://image.tmdb.org/t/p/${size}/${backdrop_path}`,
//   getDetailMeta: (movieId, meta, mediaType = "movie") =>
//     `${API_domain}/${mediaType}/${movieId}/${meta}?api_key=${apiKey}`,
//   getYoutubeVideo: (path) => `https://www.youtube.com/embed/${path}`,
// };