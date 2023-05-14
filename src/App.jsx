import { useState, useEffect } from "react";
import "./App.css";
import Posts from "./components/posts/Posts";
import Search from "./components/search/Search";

function App() {
  const [state, setState] = useState({
    error: null,
    items: [],
  });
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/posts?title_like=${title}`)
      .then((response) => response.json())
      .then((data) => setFilter(data));
  }, [title]);

  return (
    <div className="App">
      <Search setTitle={setTitle} />
      <Posts
        title={title}
        setFilter={setFilter}
        filter={filter}
        state={state}
        setState={setState}
      />
    </div>
  );
}

export default App;
