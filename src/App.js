import "./App.css";
import { useState } from "react";
import { fetchResults, fetchResult } from "./utils/api";
import Modal from "./components/Modal";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";

function App() {
  const [data, setData] = useState(null);
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
      setData(results);
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

  return (
    <div className="App">
      <SearchBar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      <Results error={error} data={data} setMovieDetails={setMovieDetails} />
      {showModal && (
        <Modal
          movie={movie}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default App;
