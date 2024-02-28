import "./App.css";
import { Outlet } from "react-router-dom";
import { Header } from "./components";
import React from "react";
function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
