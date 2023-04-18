import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { Rings } from 'react-loader-spinner';

import AppBar from './components/AppBar/AppBar';
import HomeView from './views/HomeView/Home';
import MoviesView from './views/MoviesView/Movies';
import MovieDetails from './views/MovieDetailsView/MovieDetails';
import Container from './components/Container/Container';
import NotFoundView from './views/NotFoundView/NotFound';
import CastSubView from './components/CastSubView/CastSubView';
import ReviewSubView from './components/ReviewSubView/ReviewSubview';

function App() {
  return (
    <div className="App">
      <AppBar />
      <Container>
        <Suspense fallback={<Rings color="#00BFFF" height={80} width={80} />}>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/movies" element={<MoviesView />} />
            <Route path="/movies/:id" element={<MovieDetails />}>
              <Route path="cast" element={<CastSubView />}>
                <Route path="reviews" element={<ReviewSubView />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </Suspense>
      </Container>
    </div>
  );
}

export default App;
