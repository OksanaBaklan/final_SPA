import s from './CastSubView.module.scss';
import { useState, useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as MoviesAPI from '../../services/api';
import placeholder from '../../assets/placeholder.png'

export default function CastSubView() {
  const { id } = useParams();
  const [cast, setCast] = useState(null);
console.log(id)
  useEffect(() => {
    MoviesAPI.fetchMovieCast(id)
      .then(movie => movie.cast)
      .then(setCast)
      .catch(error => console.log(error));
  }, [id]);
const imgUrl = 'https://image.tmdb.org/t/p/original/'
  return (
    <div>
      {/* <h3 className={s.SupTitle}>Cast</h3> */}
      {cast && cast.length !== 0 ? (
        <ul className={s.CastGallery}>
          {cast.map(({ cast_id, character, name, profile_path }) => {
            return (
              <div>

              <li key={cast_id} className={s.GalleryItem}>
                { (
                  <img
                    src={profile_path
                      ?imgUrl+profile_path
                      :placeholder
                    }
                    alt={name}
                    className={s.GalleryItemImage}
                  />
                )}
                <h4 className={s.Title}>Actor: {name.toUpperCase()}</h4>
                <p className={s.SubTitle}> Character: {character}</p>
              </li>
        
              </div>

            );
          })}
        </ul>
        
      )
       : (
        <h4>Nothing Found</h4>
      )

      }
            <Outlet/>
    </div>
  );
}

CastSubView.prototype = {
  id: PropTypes.string,
  cast: PropTypes.shape({
    cast_id: PropTypes.number.isRequired,
    character: PropTypes.string,
    name: PropTypes.string,
    profile_path: PropTypes.string,
  }),
};