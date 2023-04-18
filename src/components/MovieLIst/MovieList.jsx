import { Link, Routes, Route, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MovieList.module.scss';
import MovieDetails from '../../views/MovieDetailsView/MovieDetails';
import placeholder from '../../assets/placeholder.png';

export default function GalleryList({ movies, label }) {
  const location = useLocation();

  const imgUrl = 'https://image.tmdb.org/t/p/w500/';
  return (
  <div>

    <ul className={styles.list}>
      {movies &&
        movies.map(({ id, name, title, poster_path, vote_average }) => (
          <li key={id} className={styles.item}>
            <Link
              className={styles.link}
              to={{
                pathname: `/movies/${id}`,
                state: {
                  from: {
                    location,
                    label: `${label}`,
                  },
                },
              }}
            >
              <div className={styles.card}>
                <div className={styles.thumb}>
                  <img
                    src={poster_path?imgUrl + poster_path:placeholder}
                    alt={name ?? title}
                    className={styles.poster}
                  />
                </div>

                <div className={styles.text}>
                  <h4>{name ?? title}</h4>
                  <span>
                    {vote_average ? (
                      <b
                        className={
                          vote_average > 5
                            ? styles['rating--hight']
                            : styles['rating--low']
                        }
                      >
                        {vote_average}
                      </b>
                    ) : null}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
    </ul>
     <div style={{ marginLeft: "40px" }}>
 <Routes>
   <Route path=":id" element={<MovieDetails/>} />
   </Routes>
  </div>
  </div>
  );
}

GalleryList.prototype = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      title: PropTypes.string,
      poster_path: PropTypes.string,
      vote_average: PropTypes.number,
    }),
  ),
  label: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};

