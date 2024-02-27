import "./App.css";
import { Outlet } from "react-router-dom";
import React from "react";
import { Footer, Header } from "./components";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
