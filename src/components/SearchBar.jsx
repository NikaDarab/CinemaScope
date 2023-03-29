import React from "react";
import { string, func, shape, arrayOf } from "prop-types";
import "../styles/SearchBar.css";

const SearchBar = ({ query, setQuery, handleSearch, clearResults, movies }) => {
  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        value={query.title}
        onChange={(e) => setQuery({ ...query, title: e.target.value })}
        placeholder="Enter movie title"
      />
      <input
        className="search-bar__input"
        type="number"
        maxLength={4}
        value={query.year}
        onChange={(e) => setQuery({ ...query, year: e.target.value })}
        placeholder="Enter year (optional)"
      />
      <div className="search-buttons-wrapper">
        <button
          data-testid="search-button"
          className={`search-bar__button ${
            query.title.length < 3 ? "search-bar__button--disabled" : ""
          }`}
          onClick={() => handleSearch(query)}
          disabled={query?.title?.length < 3}
        >
          Search
        </button>
        <button
          data-testid="clear-button"
          className="clear-bar__button"
          onClick={clearResults}
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
  handleSearch: func.isRequired,
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
