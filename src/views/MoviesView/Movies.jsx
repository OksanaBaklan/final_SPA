import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from '../../components/Searchbar/Searchbar';
import MovieSearchLIst from '../../components/MovieLIst/MovieList';
import LoadMoreButton from '../../components/Buttons/LoadMoreBtn/LoadMoreBtn';
import scrollContent from '../../utils/utils';
import * as MoviesAPI from '../../services/api';

const Movies = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.search)

  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) {
      return;
    }
    getMovies();
    console.log(query)
  }, [ query]);


  useEffect(() => {
    if (location.search === '') {
      return;
    }
    const getLocationSearch = new URLSearchParams(location.search).get(
      'search',
    );
console.log(location.search)
    setQuery(getLocationSearch);
  }, [location.search]);

  const onChangeQuery = query => {
    setQuery(query);
    setMovies([]);
    setPage(1);
    setError(null);
    navigate({
      pathname: '/movies',
      search:  `?search=${query}`,
    });
  };

  const getMovies = () => {
    MoviesAPI.fetchMoviesBySearch(query, page)
      .then(movies => movies.results)
      .then(newMovies => {
        if (newMovies.length === 0) {
          toast.info('Nothing found 🙄', {
            autoClose: 2000,
          });
        }
        setMovies(movies => [...movies, ...newMovies]);
        setPage(page + 1);
        if (page > 1) {
          scrollContent();
        }
      })
      .catch(setError);
  

  };

  return (
    <>
      <SearchBar onChangeQuery={onChangeQuery} prevQuery={query} />
      {error && <h1>Something went wrong! </h1>}

      <MovieSearchLIst movies={movies} label="Back to search" />
      {movies && movies.length > 0 && <LoadMoreButton onClick={getMovies} />}

      <ToastContainer autoClose={3000} theme={'colored'} />
    </>
  );
};

export default Movies;