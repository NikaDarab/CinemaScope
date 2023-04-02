import React from "react";
import { handleSearch } from "../utils/api";
import { clearResults } from "../utils/hooks";
import { string, func, shape, arrayOf } from "prop-types";
import "../styles/SearchBar.css";

const SearchBar = ({
  query,
  setQuery,
  movies,
  setMovies,
  setLandingText,
  setError,
  setLoading,
  setPage,
}) => {
  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        value={query.title}
        onChange={(e) => setQuery({ ...query, title: e.target.value })}
        placeholder="Enter movie title (min 3 characters)"
      />
      <input
        className="search-bar__input"
        type="text"
        maxLength={4}
        pattern="\d{4}"
        value={query.year}
        onChange={(e) => {
          const input = e.target.value;
          // Only allow numbers and limit to 4 characters
          const filteredInput = input.replace(/[^0-9]/g, "").slice(0, 4);
          setQuery({ ...query, year: filteredInput });
        }}
        placeholder="Enter year (optional)"
      />
      <div className="search-buttons-wrapper">
        <button
          data-testid="search-button"
          className={`search-bar__button ${
            query.title.length < 3 ? "search-bar__button--disabled" : ""
          }`}
          onClick={() =>
            handleSearch(
              query,
              setMovies,
              setLandingText,
              setError,
              setLoading,
              setPage
            )
          }
          disabled={query?.title?.length < 3}
        >
          Search
        </button>
        <button
          data-testid="clear-button"
          className="clear-bar__button"
          onClick={() => clearResults(setMovies, setQuery)}
          disabled={
            !movies?.length && !query.title?.length && !query?.year.length
          }
        >
          Clear
        </button>
      </div>
    </div>
  );
};
SearchBar.propTypes = {
  query: shape({
    title: string,
    year: string,
  }).isRequired,
  setQuery: func.isRequired,
  movies: arrayOf(shape({})),
  clearResults: func,
};

SearchBar.defaultProps = {
  query: {
    title: "",
    year: "",
  },
  movies: [],
  clearResults: () => {},
};

export default SearchBar;
