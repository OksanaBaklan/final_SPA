export const fetcher = (url) => fetch(url).then((res) => res.json());
export const REACT_APP_URL = "https://tl-movie.vercel.app";
export const REACT_APP_FACEBOOK_APP_ID = '3108322012762887'
const apiKey = `3d673b2d8e40eafc68577fae5a6a1f4b`;
const API_domain = `https://api.themoviedb.org/3`;

export const API = {
  getMoviebyID: (id, mediaType) => `${API_domain}/${mediaType}/${id}?api_key=${apiKey}`,
  getMovieSearch: (query) =>
    `${API_domain}/search/movie?api_key=${apiKey}&query=${query}`,
  getMovieList: (type, page = 1, mediaType = "all") => {
    return type === "popular" || type === "top_rated" || type === "now_playing"
      ? `${API_domain}/${mediaType}/${type}?api_key=${apiKey}&page=${page}`
      : type === "discover"
      ? ` ${API_domain}/${type}/${mediaType}?api_key=${apiKey}&page=${page}`
      : ` ${API_domain}/${type}/${mediaType}/day?api_key=${apiKey}&page=${page}`;
  },

  getMovieDetail: (movieId, mediaType = "movie") =>
    `${API_domain}/${mediaType}/${movieId}?api_key=${apiKey}`,
  getImageUrl: (backdrop_path, size = "original") =>
    `https://image.tmdb.org/t/p/${size}/${backdrop_path}`,
  getDetailMeta: (movieId, meta, mediaType = "movie") =>
    `${API_domain}/${mediaType}/${movieId}/${meta}?api_key=${apiKey}`,
  getYoutubeVideo: (path) => `https://www.youtube.com/embed/${path}`,
};
