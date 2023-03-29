import "./App.css";
import { useState } from "react";
import { fetchResults, fetchResult } from "./utils/api";
import { string, shape } from "prop-types";
import Card from "./components/Card";
import SearchBar from "./components/SearchBar";
import Cards from "./components/Cards";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";

function App() {
  const [movies, setMovies] = useState(null);
  const [movie, setMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState({
    title: "",
    year: "",
  });

  const handleSearch = async (query) => {
    try {
      const results = await fetchResults(query);
      setMovies(results);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSelect = async (imdbID) => {
    try {
      const result = await fetchResult(imdbID);
      setMovie(result);
      setShowModal(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const setMovieDetails = (imdbID) => {
    handleSelect(imdbID);
    setShowModal(true);
  };

  const clearResults = () => {
    setMovies([]);
    setQuery({ title: "", year: "" });
  };

  return (
    <div className="App">
      <SearchBar
        query={query}
        setQuery={setQuery}
        movies={movies}
        handleSearch={handleSearch}
        clearResults={clearResults}
      />
      {movies ? (
        <>
          <Cards
            error={error}
            movies={movies}
            setMovieDetails={setMovieDetails}
          />
          {showModal && movie && (
            <Card
              movie={movie}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}
        </>
      ) : (
        <LandingPage />
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
  setQuery: shape({
    setQuery: string.isRequired,
  }),
  handleSearch: shape({
    handleSearch: string.isRequired,
  }),
  error: string,
  movies: shape({
    imdbID: string.isRequired,
    Poster: string.isRequired,
    Title: string.isRequired,
    Type: string.isRequired,
    Year: string.isRequired,
  }),
  setMovieDetails: shape({
    setMovieDetails: string.isRequired,
  }),
  movie: shape({
    Actors: string.isRequired,
    Director: string.isRequired,
    Genre: string.isRequired,
    Plot: string.isRequired,
    Poster: string.isRequired,
    Runtime: string.isRequired,
    Title: string.isRequired,
    Writer: string.isRequired,
    Year: string.isRequired,
  }),
  showModal: shape({
    showModal: string.isRequired,
  }),
  setShowModal: shape({
    setShowModal: string.isRequired,
  }),
};

export default App;
