import s from './MovieDetailsView.module.scss';
import axios from 'axios';
import {useParams,NavLink,useLocation, Outlet} from 'react-router-dom'
import { useState,useEffect, useContext } from 'react';
import * as MoviesAPI from '../../services/api';
import MovieVideo from '../../components/MovieVideo/MovieVideo'
import QueueBtn from '../../components/Buttons/QueueBtn/QueueBtn'
import { GlobalContext } from '../../context/GlobalState';

export default function MovieDetails (){

const {id} = useParams();
const [movies, setMovies] = useState(null);

const mediaType = 'movie';



useEffect(()=>{
    MoviesAPI.fetchFullInfoOfMovie(id)
    .then(setMovies)
    .catch(error => console.log(error));
},[id, movies])


const {pathname} = useLocation();
const Image_path = 'https://image.tmdb.org/t/p/original/'


// const fetchMovie = async (id) => {
//   // const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key='3d673b2d8e40eafc68577fae5a6a1f4b'&append_to_response=videos,images`)
//   const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
//     params: {
//         api_key: '3d673b2d8e40eafc68577fae5a6a1f4b',
//         append_to_response: "videos"
//     }
// })

// if (res.videos && res.videos.results) {
//     const trailer = res.data.videos.results.find(video =>video.name==='Official Trailer')
//     setTrailer(trailer ?trailer: res.videos.results[0])
// }
// console.log(res.data.videos.results.find(video =>video.name==='Official Trailer').key)

// // setMovie(res)
// }


// useEffect( ()=>{
//   fetchMovie(id)
//   setPlaying(false)
//   window.scrollTo(0, 0)
// },[id] )


const { addMovieToWatchlist, addMovieToWatched, watchlist, watched } =
useContext(GlobalContext);

let storedMovie = watchlist.find((o) => o.id === movies.id);
let storedMovieWatched = watched.find((o) => o.id === movies.id);

const watchlistDisabled = storedMovie
  ? true
  : storedMovieWatched
  ? true
  : false;

const watchedDisabled = storedMovieWatched ? true : false;

    return(
        <div>
             {movies && movies.status === 'Released' ? (
        <div 
        //  style={{backgroundImage:`url(${Image_path}${movies.backdrop_path})`}}
         >

          <div   className={s.card}>
            <div className={s.cardThumb}>
              <img
                className={s.cardThumbImage}
                src={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
                alt={movies.title}
              />
            </div>
            <div className={s.cardDesc}>
              <h2 className={s.title}>{`${movies.title} 
              (${
                movies.release_date.split('-')[0]
              })
              `}</h2>
              <p className={s.text}>{`User Score: ${movies.vote_average}`}</p>
              <h3 className={s.subTitle}>Overeview</h3>
              <p className={s.text}>{movies.overview}</p>
              <h3 className={s.subTitle}>Genres</h3>
              <p className={s.text}>
                {movies.genres.map(obj => Object.values(obj)[1]).join(' ')}
              </p>
              {/* <QueueBtn id={id}/> */}
              <MovieVideo mediaType={mediaType}/>


        <div className="controls">
          <button
            className="btn"
            disabled={watchlistDisabled}
            onClick={() => addMovieToWatchlist(movies.id)}
          >
            Add to Watchlist
          </button>

          <button
            className="btn"
            disabled={watchedDisabled}
            onClick={() => addMovieToWatched(movies.id)}
          >
            Add to Watched
          </button>
        </div>
             <button    className={s.Button} >Watch Trailer</button>

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
                  to={`/movies/${id}/cast`}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link"
                  activeClassName="activeLink"
                  to={`/movies/${id}/cast/reviews`}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
                  <Outlet/>

            <hr />
          </div>
{/* 
          <div>
            <Suspense fallback={<h1>Loading...</h1>}>
            <Routes>

             <Route path={pathname}>
                <Route path={`cast`} element = { <CastSubView />}/>
                <Route path={`reviews`} element = { <ReviewSubView />}/>
              </Route> 
            </Routes>
          </Suspense>
          </div> */}
        </div>
      ) : (
        <h1 className={s.message}>
          The resource you requested could not be found!
        </h1>
      )}
        </div>
    )
}