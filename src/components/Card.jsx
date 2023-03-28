import React from "react";
import "../styles/Modal.css";
import { useOutsideClickHandler } from "../utils/hooks";

const Card = ({ movie, showModal, setShowModal }) => {
  const ref = useOutsideClickHandler(() => setShowModal(false));

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content" ref={ref}>
            <button
              className="close"
              onClick={() => setShowModal(false)}
              style={{ border: "none", backgroundColor: "transparent" }}
            >
              &times;
            </button>
            {movie && (
              <>
                <h1>{movie.Title}</h1>
                <img src={movie.Poster} alt={movie.Title} />
                <p>{movie.Plot}</p>
                <p>Director:{movie.Director}</p>
                <p>Genre:{movie.Genre}</p>
                <p>Release Date:{movie.Released}</p>
                <p>IMDb Rating: {movie.imdbRating}</p>
                <p>
                  Rotten Tomatoes:
                  {
                    movie.Ratings.find((m) => m.Source === "Rotten Tomatoes")
                      .Value
                  }
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
