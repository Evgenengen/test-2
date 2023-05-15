import { useState, useEffect } from "react";
import "./App.css";
import Posts, { Post } from "./components/posts/Posts";
import Search from "./components/search/Search";

function App() {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<Post[]>([]);

  useEffect(() => {
    if (!search) {
      return;
    }

    const fetchSearchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/posts?title_like=${search}`
        );
        const data = await response.json();
        setFilter(data);
      } catch (err) {
        console.error(" Ошибка");
      }
    };

    fetchSearchPosts();
  }, [search]);

  return (
    <div className="App">
      <Search setSearch={setSearch} />
      <Posts search={search} setFilter={setFilter} filter={filter} />
    </div>
  );
}

export default App;
