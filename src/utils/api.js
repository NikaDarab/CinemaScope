import axios from "axios";
import { trimTitle } from "./helper";

const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchResults = async (query) => {
  const trimmedTitle = trimTitle(query.title);
  const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${trimmedTitle}&y=${query.year}`;

  try {
    const response = await axios.get(url);
    return response.data.Search;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchResult = async (imdbID) => {
  const url = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
