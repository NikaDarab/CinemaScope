import "./App.css";
import { useState } from "react";
import axios from "axios";
import { trimTitle } from "./utils/helper";

function App() {
  const [data, setData] = useState(null);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState({
    title: "",
    year: "",
  });

  const fetchResults = async (query) => {
    const trimmedTitle = trimTitle(query.title);
    await axios
      .get(
        `http://www.omdbapi.com/?apikey=e0a78b47&s=${trimmedTitle}&y=${query.year}`
      )
      .then((res) => {
        setData(res.data.Search);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const fetchResult = async (IMDbID) => {
    await axios
      .get(`http://www.omdbapi.com/?apikey=e0a78b47&i=${IMDbID}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <div className="App">
      <input
        type="text"
        defaultValue={query.title}
        onChange={(e) => setQuery({ ...query, title: e.target.value })}
      />
      <input
        type="text"
        value={query.year}
        onChange={(e) => setQuery({ ...query, year: e.target.value })}
      />
      <button onClick={() => fetchResults(query)}>Search</button>
      <h1>Search Results</h1>
      <div>
        {error && <p>{error}</p>}
        {data?.map((result) => (
          <button
            key={result.imdbID}
            onClick={() => fetchResult(result.imdbID)}
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            {result.Title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
