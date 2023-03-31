import "./App.css";
import { useState } from "react";
import { fetchData } from "./utils/api";
import { useInfiniteScroll } from "./utils/hooks";
import { string, shape, func } from "prop-types";
import Card from "./components/Card";
import SearchBar from "./components/SearchBar";
import Cards from "./components/Cards";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";

function App() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [landingText, setLandingText] = useState(
    `<h1>Welcome to Cinema Scope!</h1><p>Search for your favorite movies and discover new ones.</p>`
  );
  const [query, setQuery] = useState({
    title: "",
    year: "",
  });
  const [loading, setLoading] = useState(false);
  const [hasMoreResults, setHasMoreResults] = useState(true);

  useInfiniteScroll({
    hasMoreResults,
    page,
    query,
    movies,
    loading,
    setMovies,
    setPage,
    setLoading,
    setHasMoreResults,
    fetchData,
    setError,
  });

  return (
    <div className="App">
      <SearchBar
        query={query}
        setQuery={setQuery}
        movies={movies}
        setMovies={setMovies}
        setLandingText={setLandingText}
        setError={setError}
        setLoading={setLoading}
        setPage={setPage}
      />
      {movies.length > 0 ? (
        <>
          <Cards
            error={error}
            movies={movies}
            setShowModal={setShowModal}
            setMovie={setMovie}
            setError={setError}
            setLoading={setLoading}
          />
          {showModal && movie && (
            <Card
              movie={movie}
              setMovie={setMovie}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}
        </>
      ) : (
        <LandingPage error={error} landingText={landingText} />
      )}
      <Footer />
    </div>
  );
}

App.propTypes = {
  query: shape({
    title: string.isRequired,
    year: string.isRequired,
  }),
  setQuery: func,
  handleSearch: func,
  error: string,
  movies: shape({
    imdbID: string.isRequired,
    Poster: string.isRequired,
    Title: string.isRequired,
    Type: string.isRequired,
    Year: string.isRequired,
  }),
  setMovieDetails: func,
  movie: shape({
    Actors: string.isRequired,
    Director: string.isRequired,
    Genre: string.isRequired,
    Plot: string,
    Poster: string.isRequired,
    Runtime: string.isRequired,
    Title: string.isRequired,
    Writer: string.isRequired,
    Year: string.isRequired,
  }),
  showModal: func,
  setShowModal: func,
};

export default App;
