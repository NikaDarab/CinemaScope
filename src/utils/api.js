import axios from "axios";
import { trimTitle } from "./helper";

const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchData = async ({ query, imdbID, page }) => {
  let res = null;
  let err = null;
  const totalResults = null;
  const trimmedTitle = query ? trimTitle(query.title) : null;
  const url = query
    ? `https://www.omdbapi.com/?apikey=${API_KEY}&s=${trimmedTitle}&y=${query.year}&page=${page}`
    : `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`;

  await axios
    .get(url)
    .then((response) => {
      res = response.data;
      if (res.Response === "False") {
        err = res.Error;
        return;
      }
      res = query ? res.Search : res;
    })
    .catch((error) => {
      err = error.message;
    });

  return { res, err, totalResults };
};

export const handleSearch = async (
  query,
  setMovies,
  setLandingText,
  setError,
  setLoading,
  setPage
) => {
  setLoading(true);
  const results = await fetchData({ query: { ...query }, page: 1 });
  const { res, err } = results;

  if (err) {
    const errorText = `<h1>Sorry, we couldn't find any results for "${query.title}"</h1><p>Please try again.</p>`;
    setLandingText(errorText);
    setError(err);
    setMovies([]);
    setLoading(false);
    return;
  }

  setMovies(res);
  setLandingText(null);
  setError(null);
  setPage(1);
  setLoading(false);
};

export const handleSelect = async (imdbID, setMovie, setError, setLoading) => {
  setLoading(true);
  const result = await fetchData({ imdbID });
  const { res, err } = result;
  if (err) {
    setLoading(false);
    return;
  }
  setMovie(res);
  setError(null);
  setLoading(false);
};
