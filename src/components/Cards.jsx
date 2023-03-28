import React from "react";
import "../styles/Cards.css";

const Cards = ({ error, movies, setMovieDetails }) => (
  <div className="card-container">
    {error && <p>{error}</p>}
    {movies?.map((result) => (
      <div
        key={result.imdbID}
        className="card"
        onClick={() => setMovieDetails(result.imdbID)}
      >
        <div className="card-img">
          <img src={result.Poster} alt={result.Title} />
        </div>
        <div className="card-body">
          <h2 className="card-title">{result.Title}</h2>
          <p className="card-text">
            <strong>Year:</strong> {result.Year}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default Cards;
