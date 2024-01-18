import React from "react";
import "./FriendList.css";
import {
  VideoCamera,
  MagnifyingGlass,
  DotsThreeOutline,
  User,
} from "phosphor-react";
import { ItemBar } from "../ItemBar";
import image from "../../assets/among.png";

export const FriendList = () => {
  let friends = [];
  for (let i = 0; i < 18; i++) {
    friends.push(
      <ItemBar name={`friend ${i}`} key={i}>
        <User size="32px" color="white" weight="fill" />
      </ItemBar>
    );
  }

  return (
    <aside className="contact-list_container sticky-side_container">
      <div className="contact-header">
        <p className="contact-txt">Contacts</p>
        <span className="icons-wrapper">
          <VideoCamera size="21px" color="#b0b3b8" />
          <MagnifyingGlass size="21px" color="#b0b3b8" />
          <DotsThreeOutline size="21px" color="#b0b3b8" weight="fill" />
        </span>
      </div>
      <div className="friend-list_container">{friends}</div>
    </aside>
  );
};
