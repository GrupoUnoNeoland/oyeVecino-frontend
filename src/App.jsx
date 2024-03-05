import './App.css';

import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer, Header } from './components';
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
