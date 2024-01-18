import React from "react";
import { PostItem } from "./PostItem.js";

export const Post = ({
  postContent,
  postDeleteHandler,
  postImpressionsHandler,
  postEditHandler,
}) => {
  const posts = postContent.map(function (pos) {
    return (
      <PostItem
        key={pos.id}
        {...pos}
        postDeleteHandler={postDeleteHandler}
        postImpressionsHandler={postImpressionsHandler}
        postEditHandler={postEditHandler}
      />
    );
  });

  return <div className="post-container">{posts}</div>;
};
