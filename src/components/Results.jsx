import React from "react";

const Results = ({ error, data, setMovieDetails }) => (
  <>
    {error && <p>{error}</p>}
    {data?.map((result) => (
      <button
        key={result.imdbID}
        onClick={() => setMovieDetails(result.imdbID)}
        style={{ border: "none", backgroundColor: "transparent" }}
      >
        {result.Title}
      </button>
    ))}
  </>
);

export default Results;
