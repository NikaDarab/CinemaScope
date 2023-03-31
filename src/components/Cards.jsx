import React, { memo } from "react";
import { setMovieDetails } from "../utils/hooks";
import { string, shape, arrayOf, func } from "prop-types";
import "../styles/Cards.css";

const Cards = ({ movies, setShowModal, setMovie, setError, setLoading }) => (
  <div className="card-container">
    {movies?.map((result, index) => (
      <div
        key={index}
        className="card"
        onClick={() =>
          setMovieDetails(
            result.imdbID,
            setShowModal,
            setMovie,
            setError,
            setLoading
          )
        }
      >
        <div className="card-img">
          <img
            src={result.Poster ? result.Poster : "/no-image.webp"}
            alt={result.Title}
          />
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
  movies: [],
  setMovieDetails: () => {},
};

export default memo(Cards);
