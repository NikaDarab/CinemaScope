import React from "react";

const SearchBar = ({ query, setQuery, handleSearch }) => (
  <>
    <input
      type="text"
      defaultValue={query.title}
      onChange={(e) => setQuery({ ...query, title: e.target.value })}
    />
    <input
      type="text"
      value={query.year}
      onChange={(e) => setQuery({ ...query, year: e.target.value })}
    />
    <button onClick={() => handleSearch(query)}>Search</button>
    <h1>Search Results</h1>
  </>
);

export default SearchBar;
