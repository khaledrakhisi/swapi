import React from "react";
import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";

import "./scss/App.scss";

function App() {
  return (
    <section>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </section>
  );
}

export default App;
