import React, { useContext, createContext, useState } from "react";
import "./Navbar.css";
import {
  FacebookLogo,
  House,
  UsersThree,
  GameController,
  SquaresFour,
  MessengerLogo,
  Bell,
  User,
} from "phosphor-react";

import { ModeContext } from "../../layouts/RootLayout";
import { NavMode } from "./NavMode";
import { NavLink } from "react-router-dom";

export const NavContext = createContext();

export const Navbar = () => {
  const [mode, setMode] = useContext(ModeContext);
  const [navMode, setNavMode] = useState("");

  function clickHandler(e) {
    let element = e.target.closest("span");
    if (!element) return;

    let elClass = [...element.classList][0];
    classRemover(elClass);
    element.classList.toggle("active");
  }
  function classRemover(elClass) {
    let navPage = [...document.getElementsByClassName(elClass)];

    navPage.forEach((el) => {
      el.classList.remove("active");
    });
  }

  function changeNavMode(e) {
    // setNavMode(newNavMode);
    const ProposedMode = e.currentTarget.dataset.mode;
    if (navMode === ProposedMode) {
      setNavMode("");
      return;
    }
    setNavMode(ProposedMode);
  }

  return (
    <header className={`header ${mode}`}>
      <nav className="nav">
        <div className="left-nav_container">
          <FacebookLogo size="40px" color="#006cba" weight="fill" />
        </div>
        <div className="center-nav_container" onClick={clickHandler}>
          <span className="center-icon_container">
            <NavLink to="/">
              <House size="28px" color="#d9d6d1" weight="fill" />
            </NavLink>
          </span>
          <span className="center-icon_container">
            <NavLink to="/friends">
              <UsersThree size="28px" color="#d9d6d1" weight="fill" />
            </NavLink>
          </span>
          <span className="center-icon_container">
            <NavLink to="/games">
              <GameController size="28px" color="#d9d6d1" weight="fill" />
            </NavLink>
          </span>
        </div>
        <div className="right-nav_container">
          <span
            className={`right-icon_container ${
              navMode == "apps" ? "active" : ""
            }`}
            data-mode="apps"
            onClick={changeNavMode}
          >
            <SquaresFour size="40px" color="#d9d6d1" weight="fill" />
          </span>
          <span
            className={`right-icon_container ${
              navMode == "message" ? "active" : ""
            }`}
            data-mode="message"
            onClick={changeNavMode}
          >
            <MessengerLogo size="40px" color="#d9d6d1" weight="fill" />
          </span>
          <span
            className={`right-icon_container ${
              navMode == "notification" ? "active" : ""
            }`}
            data-mode="notification"
            onClick={changeNavMode}
          >
            <Bell size="40px" color="#d9d6d1" weight="fill" />
          </span>
          <span
            className={`right-icon_container user-icon ${
              navMode == "profile" ? "active" : ""
            }`}
            data-mode="profile"
            onClick={changeNavMode}
          >
            <User size="40px" color="#fcfcfd" weight="fill" />
          </span>
        </div>
      </nav>
      <NavContext.Provider value={navMode}>
        <NavMode />
      </NavContext.Provider>
    </header>
  );
};
