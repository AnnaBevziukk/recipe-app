import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import style from "./App.module.scss";

import HomePage from "./pages/HomePage.jsx";

import Container from "./components/UI/Container.jsx";
import Header from "./components/UI/Header.jsx";
import Footer from "./components/UI/Footer.jsx";


function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);


  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={style.app}>
      <Router>
        <Header toggleTheme={toggleTheme} currentTheme={theme} />
        <div className={style.content}>
          <Container>
            <Routes>
              <Route path="/" element={<HomePage />} />

            </Routes>

          </Container>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
