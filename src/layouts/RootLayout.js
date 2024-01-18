import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar.js";
import { createContext } from "react";

export const ModeContext = createContext();

export const RootLayout = function () {
  const [mode, setMode] = useState("");
  return (
    <>
      <ModeContext.Provider value={[mode, setMode]}>
        <Navbar />
        <Outlet />
      </ModeContext.Provider>
    </>
  );
};
