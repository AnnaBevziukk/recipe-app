import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import style from "./App.module.scss";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import NewRecipePage from "./pages/NewRecipePage.jsx";
import ModerationPage from "./pages/ModerationPage.jsx";

import RecipePage from "./components/RecipePage.jsx";

import Container from "./components/UI/Container.jsx";
import Header from "./components/UI/Header.jsx";
import Footer from "./components/UI/Footer.jsx";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [role, setRole] = useState("moderator"); // Тимчасова роль, заміниш на реальну логіку

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
        <Header toggleTheme={toggleTheme} currentTheme={theme} isLoggedIn={true} role={role} />
        <div className={style.content}>
          <Container>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/recipes/new" element={<NewRecipePage />} />
              <Route path="/moderation" element={<ModerationPage />} />
              <Route path="/recipes/:id" element={<RecipePage />} />
            </Routes>
          </Container>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;