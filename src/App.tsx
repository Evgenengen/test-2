import { FC, useState, useEffect } from "react";
import "./App.css";
import Posts from "./components/posts/Posts";
import Search from "./components/search/Search";
interface Post {
  id: number;
  title: string;
  body: string;
  favorites: boolean;
}
function App() {
  const [title, setTitle] = useState<string>("");
  const [filter, setFilter] = useState<Post[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/posts?title_like=${title}`)
      .then((response) => response.json())
      .then((data) => setFilter(data));
  }, [title]);

  return (
    <div className="App">
      <Search setTitle={setTitle} />
      <Posts title={title} setFilter={setFilter} filter={filter} />
    </div>
  );
}

export default App;
