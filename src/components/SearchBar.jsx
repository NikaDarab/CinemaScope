import React from "react";
import { string, func, shape } from "prop-types";
import "../styles/SearchBar.css";

const SearchBar = ({ query, setQuery, handleSearch }) => {
  const isDisabled = query.title.length < 3;

  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        defaultValue={query.title}
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
          isDisabled ? "search-bar__button--disabled" : ""
        }`}
        onClick={() => handleSearch(query)}
        disabled={isDisabled}
      >
        Search
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
  handleSearch: func.isRequired,
};

SearchBar.defaultProps = {
  query: {
    title: "",
    year: "",
  },
};

export default SearchBar;
