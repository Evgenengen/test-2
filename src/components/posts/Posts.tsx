import { FC, useState, useEffect } from "react";
import { Post } from "./type";

interface PostProps {
  setFilter: React.Dispatch<React.SetStateAction<Post[]>>;
  search: string;
  filter: Post[];
}

interface StateItem {
  error: null | string;
  postList: Post[];
}

const Posts: FC<PostProps> = ({ search, filter, setFilter }) => {
  const [state, setState] = useState<StateItem>({
    error: null,
    postList: [],
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts");
        const data = await response.json();
        setState((prevState) => ({ ...prevState, postList: data }));
      } catch (err) {
        setState((prevState) => ({
          ...prevState,
          error: err?.toString() || "Неизвестная ошибка",
        }));
      }
    };
    fetchPosts();
  }, []);

  const handlerPostClick = (item: Post) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: item.id,
        title: item.title,
        body: item.body,
        isFavorite: !item.isFavorite,
      }),
    };
    const fetchFavoritePost = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/posts/${item.id}/`,
          requestOptions
        );
        const data = await response.json();
        setState((prevState) => ({
          ...prevState,
          postList: [
            ...state.postList.slice(0, item.id - 1),
            data,
            ...state.postList.slice(item.id),
          ],
        }));
      } catch (err) {
        console.error("Error");
      }
    };
    fetchFavoritePost();
  };

  if (state.error) {
    return <p>Error</p>;
  }
  const message = state.postList.map((item) => {
    const postСlasses = item.isFavorite ? "favorites__red" : "favorites__grey";
    return (
      <li className="post__item" key={item.id}>
        <div className="post__inner">
          <div className="post__title">{item.title}</div>
          <div className="post__text">{item.body}</div>
        </div>
        <div onClick={() => handlerPostClick(item)}>
          <img
            className={postСlasses}
            src="images/like-3.svg"
            alt="favorites"
          />
        </div>
      </li>
    );
  });

  const handlerFavoriteClick = (item: Post) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: item.id,
        title: item.title,
        body: item.body,
        isFavorite: !item.isFavorite,
      }),
    };
    const fetchFavoriteFilter = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/posts/${item.id}/`,
          requestOptions
        );

        const data = await response.json();
        setFilter((prevList) =>
          prevList.map((item) => {
            if (item.id === data.id) {
              return { ...item, ...data };
            }
            return item;
          })
        );
      } catch (err) {
        console.error("Error");
      }
    };
    fetchFavoriteFilter();
  };

  const filterItem = filter.map((item) => {
    const postСlasses = item.isFavorite ? "favorites__red" : "favorites__grey";
    return (
      <li className="post__item" key={item.id}>
        <div className="post__inner">
          <div className="post__title">{item.title}</div>
          <div className="post__text">{item.body}</div>
        </div>
        <div onClick={() => handlerFavoriteClick(item)}>
          <img
            className={postСlasses}
            src="images/like-3.svg"
            alt="favorites"
          />
        </div>
      </li>
    );
  });

  const posts = search.length <= 0 ? message : filterItem;
  return <ul className="posts__list">{posts}</ul>;
};

export default Posts;
