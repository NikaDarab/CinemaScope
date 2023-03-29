import React from "react";
import { string, arrayOf, shape, func, bool } from "prop-types";
import "../styles/Card.css";
import { useOutsideClickHandler } from "../utils/hooks";

const Card = ({ movie, showModal, setShowModal }) => {
  const ref = useOutsideClickHandler(() => setShowModal(false));

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" ref={ref}>
            {movie && (
              <>
                <h2 className="movie-title">{movie.Title}</h2>
                <img
                  className="movie-poster"
                  src={movie.Poster}
                  alt={movie.Title}
                />
                <p className="movie-plot">{movie.Plot}</p>
                <div className="movie-details">
                  <div className="movie-detail">
                    <span className="detail-label">Director:</span>
                    <span className="detail-value">{movie.Director}</span>
                  </div>
                  <div className="movie-detail">
                    <span className="detail-label">Genre:</span>
                    <span className="detail-value">{movie.Genre}</span>
                  </div>
                  <div className="movie-detail">
                    <span className="detail-label">Release Date:</span>
                    <span className="detail-value">{movie.Released}</span>
                  </div>
                  <div className="movie-detail">
                    <span className="detail-label">IMDb Rating:</span>
                    <span className="detail-value">{movie.imdbRating}</span>
                  </div>
                  {movie.Ratings.find(
                    (m) => m?.Source === "Rotten Tomatoes"
                  ) ? (
                    <div className="movie-detail">
                      <span className="detail-label">Rotten Tomatoes:</span>
                      <span className="detail-value">
                        {
                          movie.Ratings.find(
                            (m) => m?.Source === "Rotten Tomatoes"
                          )?.Value
                        }
                      </span>
                    </div>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

Card.propTypes = {
  movie: shape({
    Title: string.isRequired,
    Poster: string.isRequired,
    Plot: string.isRequired,
    Director: string.isRequired,
    Genre: string.isRequired,
    Released: string.isRequired,
    imdbRating: string.isRequired,
    Ratings: arrayOf(
      shape({
        Source: string.isRequired,
        Value: string.isRequired,
      })
    ),
  }),
  showModal: bool.isRequired,
  setShowModal: func.isRequired,
};

export default Card;
