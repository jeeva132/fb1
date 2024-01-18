import React, { useContext } from "react";
import { NavContext } from "./Navbar";
import { useAuth } from "../../context/AuthProvider";
export const NavMode = () => {
  const navMode = useContext(NavContext);
  const { accountSignOut } = useAuth();
  return (
    <>
      <div className={`nav-mode_container ${navMode ? "appear" : ""}`}>
        {navMode == "profile" ? (
          <div className="logout-div" onClick={accountSignOut}>
            Logout
          </div>
        ) : (
          navMode
        )}
      </div>
    </>
  );
};
