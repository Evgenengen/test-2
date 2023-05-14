import { useEffect } from "react";

const Posts = ({ title, filter, setFilter, state, setState }) => {
  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then(
        (data) => setState({ ...state, items: data, isLoaded: true }),
        (error) => {
          setState({ ...state, isLoaded: true, error });
        }
      );
  }, []);

  let message;
  const favoritesPost = (item) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: item.id,
        title: item.title,
        body: item.body,
        favorites: !item.favorites,
      }),
    };
    fetch(`http://localhost:3000/posts/${item.id}/`, requestOptions)
      .then((response) => response.json())
      .then((data) =>
        setState({
          ...state,
          items: [
            ...state.items.slice(0, item.id - 1),
            data,
            ...state.items.slice(item.id),
          ],
        })
      );
  };
  if (state.error) {
    message = <p>Error</p>;
  } else {
    message = state.items.map((item) => {
      const post__classes = item.favorites
        ? "favorites__red"
        : "favorites__grey";

      return (
        <li className="post__item" key={item.id}>
          <div className="post__inner">
            <div className="post__title">{item.title}</div>
            <div className="post__text">{item.body}</div>
          </div>
          <div onClick={() => favoritesPost(item)}>
            <img
              className={post__classes}
              src="images/like-3.svg"
              alt="favorites"
            />
          </div>
        </li>
      );
    });
  }
  const favoritesPostFilter = (item) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: item.id,
        title: item.title,
        body: item.body,
        favorites: !item.favorites,
      }),
    };
    fetch(`http://localhost:3000/posts/${item.id}/`, requestOptions)
      .then((response) => response.json())
      .then((data) =>
        setFilter([
          ...filter.slice(0, item.id - 1),
          data,
          ...filter.slice(item.id),
        ])
      );
  };
  const filterItem = filter.map((item) => {
    const post__classes = item.favorites ? "favorites__red" : "favorites__grey";
    return (
      <li className="post__item" key={item.id}>
        <div className="post__inner">
          <div className="post__title">{item.title}</div>
          <div className="post__text">{item.body}</div>
        </div>
        <div onClick={() => favoritesPostFilter(item)}>
          <img
            className={post__classes}
            src="images/like-3.svg"
            alt="favorites"
          />
        </div>
      </li>
    );
  });

  const posts = title.length <= 0 ? message : filterItem;

  return <ul className="posts__list">{posts}</ul>;
};
export default Posts;
