import './App.css';
// import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import HomeView from './views/HomeView/Home';

// const HomeView = lazy(() =>
//   import('./views/HomeView/Home' /* webpackChunkName: "home-view"  */),
// );
function App() {
  return (
    <div className="App">
      <AppBar />
      <Routes>
        <Route path="/" element={<HomeView />} />
      </Routes>
    </div>
  );
}

export default App;
