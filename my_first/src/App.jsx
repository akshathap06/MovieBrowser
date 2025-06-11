import { useEffect, useState } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx'
import { useDebounce } from 'react-use'
import { getTrendingMovies, updateSearchCount } from './appwrite.js'

// API base URL and key for The Movie Database (TMDB)
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Options for fetch requests to TMDB
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

// Main App component
const App = () => {
  // State for debounced search term (to limit API calls)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  // State for the current search input
  const [searchTerm, setSearchTerm] = useState('');
  // State for the list of movies returned from the API
  const [movieList, setMovieList] = useState([]);
  // State for error messages
  const [errorMessage, setErrorMessage] = useState('');
  // State to show loading spinner
  const [isLoading, setIsLoading] = useState(false);
  // State for trending movies from Appwrite
  const [trendingMovies, setTrendingMovies] = useState([]);

  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  // Fetch movies from TMDB API based on search query
  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      // Choose endpoint based on whether searching or discovering
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if(!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      // Handle error from API
      if(data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
      // Update search count in Appwrite if searching
      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  // Load trending movies from Appwrite
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }

  // Fetch movies when debounced search term changes
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Load trending movies on initial mount
  useEffect(() => {
    loadTrendingMovies();
  }, []);

  // Render the main UI
  return (
    <main>
      {/* Background pattern */}
      <div className="pattern"/>
      <div className="wrapper">
        <header>
          {/* Hero image and heading */}
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
          {/* Search bar */}
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        {/* Trending movies section */}
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}
        {/* All movies section */}
        <section className="all-movies">
          <h2>All Movies</h2>
          {/* Show spinner, error, or movie list */}
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App