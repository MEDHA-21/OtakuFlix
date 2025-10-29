import "./App.css";
import "./styles/main.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import Watchlist from "./components/Watchlist";
import Login from "./components/Login";
import AnimeDetails from "./components/AnimeDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import NavbarComponent from "./components/NavbarComponent";
import useOnlineStatus from "./components/useOnlineStatus";
import AnimeApiService from "./services/AnimeApiService";

function App() {
  const [movies, setMovies] = useState([]);
  const [categorizedData, setCategorizedData] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load categorized data from API
  useEffect(() => {
    const loadCategorizedData = async () => {
      setLoading(true);
      
      try {
        // Load both categorized and mixed data
        const [categorized, mixed] = await Promise.all([
          AnimeApiService.getCategorizedAnimeData(),
          AnimeApiService.getMixedAnimeData()
        ]);
        
        if (categorized && Object.keys(categorized).length > 0) {
          setCategorizedData(categorized);
          
          // Combine all categorized data for the movies state (for search functionality)
          const allMovies = [
            ...categorized.popular,
            ...categorized.action,
            ...categorized.romance,
            ...categorized.comedy,
            ...categorized.currentSeason
          ];
          
          // Remove duplicates
          const uniqueMovies = allMovies.filter((movie, index, self) =>
            index === self.findIndex(m => m.id === movie.id)
          );
          
          setMovies(uniqueMovies);
          
        } else if (mixed && mixed.length > 0) {
          // Fallback to mixed data if categorized fails
          setMovies(mixed);
        } else {
          setMovies([]);
        }
        
      } catch (error) {
        console.error('❌ Error loading data:', error);
        setMovies([]);
        setCategorizedData(null);
      } finally {
        setLoading(false);
      }
    };

    loadCategorizedData();
  }, []);

  const toggleWatchlist = (movieId) => {
    // if the current state has the movie id, then remove it else add it
    setWatchlist((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1>
        Looks like you're offline!! Please check your internet connection.
      </h1>
    );

  return (
    <div className="App">
      {/* Full Screen Loader */}
      {loading && (
        <div className="loading-screen">
          <div className="loader"></div>
          <div className="loading-text">Loading anime data...</div>
        </div>
      )}

      <div className="container">

        <Router>
          <NavbarComponent />

          {/* No data message */}
          {!loading && movies.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '20px', 
              fontSize: '1.2rem',
              color: '#dc3545'
            }}>
              ❌ Unable to load anime data. Please check your internet connection.
            </div>
          )}

          <Routes>
            <Route
              path="/"
              element={
                <LandingPage
                  watchlist={watchlist}
                  movies={movies}
                  categorizedData={categorizedData}
                  toggleWatchlist={toggleWatchlist}
                />
              }
            ></Route>
            <Route
              path="/watchlist"
              element={
                <Watchlist
                  watchlist={watchlist}
                  movies={movies}
                  toggleWatchlist={toggleWatchlist}
                />
              }
            ></Route>
            <Route
              path="/login"
              element={
                <Login

                />
              }
            ></Route>
            <Route
              path="/anime/:id"
              element={
                <AnimeDetails
                  movies={movies}
                />
              }
            ></Route>
          </Routes>
        </Router>
      </div>

      {/* Data source indicator */}
          {!loading && movies.length > 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '10px', 
              fontSize: '0.9rem',
              color: 'rgb(247, 82, 112)',
              fontWeight: 'bold'
            }}>
              🌐 Real-time data from MyAnimeList | {movies.length} anime loaded
            </div>
          )}

      <Footer />
    </div>
  );
}

export default App;
