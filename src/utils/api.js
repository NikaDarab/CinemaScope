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
