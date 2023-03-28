import "./App.css";
import { useState } from "react";
import axios from "axios";
import { trimTitle } from "./utils/helper";

function App() {
  const [data, setData] = useState(null);

  const [error, setError] = useState(null);
  const [query, setQuery] = useState({
    title: "",
    year: "",
  });

  const fetchData = async (query) => {
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
      <button onClick={() => fetchData(query)}>Search</button>
      <h1>Search Results</h1>
      <div>
        {error && <p>{error}</p>}
        {data?.map((result) => (
          <div key={result.imdbID}>
            <h3>{result.Title}</h3>
            <p>{result.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
