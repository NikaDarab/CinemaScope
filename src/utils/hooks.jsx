import { useEffect, useRef } from "react";
import { handleSelect } from "../utils/api";

export const useOutsideClickHandler = (handler) => {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handler]);

  return ref;
};

export const useInfiniteScroll = ({
  hasMoreResults,
  page,
  query,
  movies,
  setMovies,
  setPage,
  setLoading,
  loading,
  setHasMoreResults,
  fetchData,
  setError,
}) => {
  useEffect(() => {
    const handleScroll = async () => {
      if (
        !hasMoreResults ||
        window.innerHeight + window.scrollY < document.body.offsetHeight - 500
      ) {
        return;
      }
      const nextPage = page + 1;
      setLoading(true);
      const results = await fetchData({ query: { ...query }, page: nextPage });
      const { res, err } = results;
      if (err) {
        setError(err);
        setLoading(false);
        return;
      }
      if (res.length === 0) {
        setHasMoreResults(false);
        return;
      }
      setMovies([...movies, ...res]);
      setPage(nextPage);
      setLoading(false);
      setHasMoreResults(true);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  },  [hasMoreResults, loading, page, query, movies]);
};

export const setMovieDetails = ( imdbID, setShowModal, setMovie, setError, setLoading) => {
  handleSelect(imdbID, setMovie, setError, setLoading);
  setShowModal(true);
};

export const clearResults = ( setMovies, setQuery) => {
  setMovies([]);
  setQuery({ title: "", year: "" });
}
