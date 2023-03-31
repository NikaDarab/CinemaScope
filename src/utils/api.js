import axios from "axios";
import { trimTitle } from "./helper";

const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchData = async ({ query, imdbID }) => {
  let res = null;
  let err = null;
  let pages = null;
  const trimmedTitle = query ? trimTitle(query.title) : null;
  const url = query
    ? `https://www.omdbapi.com/?apikey=${API_KEY}&s=${trimmedTitle}&y=${query.year}&page=${query.page}`
    : `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`;

  await axios
    .get(url)
    .then((response) => {
      res = response.data;
      pages = Array.from(Array(Math.ceil(res.totalResults / 10)).keys()).map(
        (i) => i + 1
      );
      if (res.Response === "False") {
        err = res.Error;
        return;
      }
      res = query ? res.Search : res;
    })
    .catch((error) => {
      err = error.message;
    });

  return { res, err, pages };
};
