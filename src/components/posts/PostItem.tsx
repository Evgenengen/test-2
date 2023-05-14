import { FC } from "react";
import { Post } from "./type";

interface PostItemProps {
  item: Post;
  handlerPostClick: (item: Post) => void;
}

const PostItem: FC<PostItemProps> = ({ item, handlerPostClick }) => {
  const postСlasses = item.isFavorite ? "favorites__red" : "favorites__grey";
  return (
    <li className="post__item" key={item.id}>
      <div className="post__inner">
        <div className="post__title">{item.title}</div>
        <div className="post__text">{item.body}</div>
      </div>
      <div onClick={() => handlerPostClick(item)}>
        <img className={postСlasses} src="images/like-3.svg" alt="favorites" />
      </div>
    </li>
  );
};

export default PostItem;
