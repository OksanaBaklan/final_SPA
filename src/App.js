import './App.css';
import { Routes, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import HomeView from './views/HomeView/Home';
import MoviesView from './views/MoviesView/Movies';
import MovieDetails from './views/MovieDetailsView/MovieDetails';
import Container from './components/Container/Container';
import NotFoundView from './views/NotFoundView/NotFound';

function App() {
  return (
    <div className="App">
      <AppBar />
      <Container>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="movies" element={<MoviesView />} />
          <Route path="movies/:id" element={<MovieDetails />} />
          <Route path="movies/movies/:id" element={<MovieDetails />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
