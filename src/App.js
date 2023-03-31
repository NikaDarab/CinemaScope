import "./App.css";
import { useState, useEffect } from "react";
import { fetchData } from "./utils/api";
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

  useEffect(() => {
    const handleScroll = async () => {
      if (
        !hasMoreResults ||
        window.innerHeight + window.scrollY < document.body.offsetHeight - 500
      ) {
        return;
      }
      const nextPage = page + 1;
      setLoading(true);
      const results = await fetchData({ query: { ...query }, page: nextPage });
      const { res, err } = results;
      if (err) {
        setError(err);
        setLoading(false);
        return;
      }
      if (res.length === 0) {
        setHasMoreResults(false);
        return;
      }
      setMovies([...movies, ...res]);
      setPage(nextPage);
      setLoading(false);
      setHasMoreResults(true);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMoreResults, loading, page, query, movies]);

  const handleSearch = async (query) => {
    setLoading(true);
    const results = await fetchData({ query: { ...query }, page: 1 });
    const { res, err } = results;

    if (err) {
      const errorText = `<h1>Sorry, we couldn't find any results for "${query.title}"</h1><p>Please try again.</p>`;
      setLandingText(errorText);
      setError(err);
      setMovies([]);
      setLoading(false);
      return;
    }

    setMovies(res);
    setLandingText(null);
    setError(null);
    setPage(1);
    setLoading(false);
  };

  const handleSelect = async (imdbID) => {
    setLoading(true);
    const result = await fetchData({ imdbID });
    const { res, err } = result;
    if (err) {
      setLoading(false);
      return;
    }
    setMovie(res);
    setError(null);
    setLoading(false);
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
      {movies.length > 0 ? (
        <>
          <Cards
            error={error}
            movies={movies}
            setMovieDetails={setMovieDetails}
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
