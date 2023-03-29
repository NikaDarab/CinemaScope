import React from "react";
import { string, func, shape, arrayOf } from "prop-types";
import "../styles/SearchBar.css";

const SearchBar = ({ query, setQuery, handleSearch, clearResults }) => {
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
        type="text"
        value={query.year}
        onChange={(e) => setQuery({ ...query, year: e.target.value })}
        placeholder="Enter year (optional)"
      />
      <button
        className={`search-bar__button ${
          query.title.length < 3 ? "search-bar__button--disabled" : ""
        }`}
        onClick={() => handleSearch(query)}
        disabled={query.title.length < 3}
      >
        Search
      </button>
      <button className="clear-bar__button" onClick={clearResults}>
        Clear
      </button>
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
  setMovies: func.isRequired,
  handleSearch: func.isRequired,
};

SearchBar.defaultProps = {
  query: {
    title: "",
    year: "",
  },
  movies: [],
};

export default SearchBar;
