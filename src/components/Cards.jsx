import React, { memo }  from "react";
import { string, shape, arrayOf, func } from "prop-types";
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

          <div className="card-text">
            <div>
              <strong>Year:</strong> {result.Year}
            </div>
            <div>
              <strong>Type:</strong> {result.Type}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

Cards.propTypes = {
  error: string,
  movies: arrayOf(
    shape({
      imdbID: string,
      Poster: string,
      Title: string,
      Year: string,
    })
  ),
  setMovieDetails: func,
};

Cards.defaultProps = {
  error: "",
  movies: [],
  setMovieDetails: () => {},
};

export default  memo(Cards);
