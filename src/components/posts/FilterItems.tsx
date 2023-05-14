import { FC } from "react";
import { Post } from "./type";

interface FilterItemProps {
  item: Post;
  handlerFavoriteClick: (item: Post) => void;
}

const FilterItems: FC<FilterItemProps> = ({ item, handlerFavoriteClick }) => {
  const postСlasses = item.isFavorite ? "favorites__red" : "favorites__grey";
  return (
    <li className="post__item" key={item.id}>
      <div className="post__inner">
        <div className="post__title">{item.title}</div>
        <div className="post__text">{item.body}</div>
      </div>
      <div onClick={() => handlerFavoriteClick(item)}>
        <img className={postСlasses} src="images/like-3.svg" alt="favorites" />
      </div>
    </li>
  );
};

export default FilterItems;
