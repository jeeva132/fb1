import React, { useContext, useEffect, useState } from "react";
import { User, DotsThreeOutline, X, ThumbsUp, Chat } from "phosphor-react";
import { useAuth } from "../../context/AuthProvider.js";
import { dateConverter } from "../../helper/helper.js";
import { ModeContext } from "../../layouts/RootLayout.js";
import { getDoc, doc } from "firebase/firestore";

import { db } from "../../config/firebase.js";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export const PostItem = function ({
  name,
  text,
  image,
  id,
  auto,
  postDeleteHandler,
  impressions,
  postImpressionsHandler,
  createdAt,
  authorId,
}) {
  const { currentUser } = useAuth();
  const [mode, setMode] = useContext(ModeContext);
  const [isLiked, setIsLiked] = useState(false);
  const [taskType, setTaskType] = useState("");
  const [postImage, setPostImage] = useState(null);

  useEffect(() => {
    if (!image) return;
    (async function Invoke() {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${image}`);
        const url = await getDownloadURL(storageRef);
        setPostImage(url);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async function Invoke() {
      try {
        let docRef = doc(db, "posts", id, "liked", currentUser.uid);
        let docum = await getDoc(docRef);
        if (docum.exists()) setIsLiked(true);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const newdate = dateConverter(createdAt);

  function handleImpression(id) {
    setIsLiked((prev) => !prev);
    postImpressionsHandler(id, isLiked);
  }

  function handleDelete(e) {
    if (taskType) {
      setTaskType("");
      return;
    }
    setTaskType(e.currentTarget.dataset.taskType);
  }

  function imageGenerator() {
    // check if user have selected image by themself and if user haven't put the auto image mode on

    if (image) {
      return postImage;
    }
    if (auto) {
      let imageParam = text.split(" ").splice(-2);

      let imageUrl = `https://source.unsplash.com/random?${imageParam}`;
      return imageUrl;
    }
  }

  return (
    <div className="post-card_container container">
      <div className="post-card_top">
        <div className="post-top_left">
          <span>
            <span className="user-icon">
              <User size="40px" color="white" weight="fill" />
            </span>
          </span>
          <span>
            <h3 className="post-creater">{name}</h3>
            <p className="upload-time">{newdate}</p>
          </span>
        </div>
        <div className="post-right">
          <span className="rigt-icon_wrapper">
            <span>
              <DotsThreeOutline size="22px" color="#a8abaf" weight="fill" />
            </span>
            <span onClick={handleDelete} data-task-type="Delete">
              <X size="22px" color="#a8abaf" />
            </span>
            \
          </span>
        </div>
      </div>
      <div className="post-card_bottom">
        <div className="post-content_container">
          <p className="post-text">{text}</p>
          {(image || auto) && ( // checks if auto or image is true and if it is true then generate the adds the image
            <img className="post-image" src={imageGenerator()} />
          )}
        </div>

        <div className="interaction-container">
          <span
            className={`interaction ${isLiked ? "liked" : ""}`}
            onClick={() => handleImpression(id)}
          >
            <ThumbsUp
              size="20px"
              color={`${isLiked ? "#2d86ff" : "#abaeb3"}`}
              weight={`${isLiked ? "fill" : "bold"}`}
            />
            <p>Like ({impressions})</p>
          </span>
          <span className="interaction">
            <Chat size="20px" color="#abaeb3" weight="bold" />
            <p>Comment</p>
          </span>
        </div>
      </div>
      {taskType &&
        (currentUser.uid === authorId ? (
          <span
            onClick={() => postDeleteHandler(id)}
            className="post-write_place"
          >
            {taskType} Post
          </span>
        ) : (
          <span className="post-write_place">Cant {taskType} others post</span>
        ))}
    </div>
  );
};
