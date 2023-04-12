import s from './MovieDetailsView.module.scss';
import {useParams,Routes,Route, NavLink} from 'react-router-dom'
import { useState,useEffect } from 'react';
import * as MoviesAPI from '../../services/api';
import CastSubView from '../../components/CastSubView/CastSubView';
import ReviewSubView from '../../components/ReviewSubView/ReviewSubview'

export default function MovieDetails (){
    const {id} = useParams();
// console.log(id)
const [movie, setMovie] = useState(null);
useEffect(()=>{
    MoviesAPI.fetchFullInfoOfMovie(id)
    .then(setMovie)
    .catch(error => console.log(error));
},[id, movie])
// const { url, path } = useMatch();
// console.log(url)

    return(
        <div>
             {movie  ? (
        <>

          <div className={s.card}>
            <div className={s.cardThumb}>
              <img
                className={s.cardThumbImage}
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <div className={s.cardDesc}>
              <h2 className={s.title}>{`${movie.title} (${
                movie.release_date.split('-')[0]
              })`}</h2>
              <p className={s.text}>{`User Score: ${movie.vote_average}`}</p>
              <h3 className={s.subTitle}>Overeview</h3>
              <p className={s.text}>{movie.overview}</p>
              <h3 className={s.subTitle}>Genres</h3>
              <p className={s.text}>
                {movie.genres.map(obj => Object.values(obj)[1]).join(' ')}
              </p>
            </div>
          </div>
          <div>
            <hr />
            <h3 className={s.subTitle}>Additional information</h3>
            <ul className="list">
              <li>
                <NavLink
                  className="link"
                  activeClassName="activeLink"
                  to="/cast" 
                //   to={{
                //     pathname: `${url}/cast`,
                //     // state: { from: { location } },
                //     // state: { ...location.state },
                //   }}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link"
                  activeClassName="activeLink"
                  to={`/reviews`}
    
                >
                  Reviews
                </NavLink>
              </li>
            </ul>

            <hr />
          </div>
          <div>
            <Routes>
{/* <Route  path={`${path}/cast`} element={<CastSubView/>} />
<Route  path={`${path}/reviews`} element={<ReviewSubView/>} /> */}

            </Routes>
          </div>
          <div>
            {/* <Suspense fallback={<h1>Loading...</h1>}> */}
              <Routes>
                <Route path={`/cast`} exact>
                  {/* <CastSubView /> */}
                </Route>

                <Route path={`/reviews`} exact>
                  {/* <ReviewSubView /> */}
                </Route>
              </Routes>
            {/* </Suspense> */}
          </div>
        </>
      ) : (
        <h1 className={s.message}>
          The resource you requested could not be found!
        </h1>
      )}
        </div>
    )
}