import React from "react";
import s from "../../components/UI/Header.module.scss";

import Container from "./Container";
import NavBar from "./NavBar";

import { FaSun, FaMoon } from "react-icons/fa"; // Імпортуємо іконки

function Header({ toggleTheme, currentTheme, isLoggedIn, role }) {
    return (
      <div className={s.header}>
          <Container>
              <div className={s.header__container}>
                  <div className={s.header__logo}>
                      <a href="/">Moon<span className={s.header__highlight}>Recipe</span></a>
                  </div>
                  <div className={s.header__right}>
                      <NavBar isLoggedIn={isLoggedIn} role={role} />
                      <button className={s.header__theme} onClick={toggleTheme}>
                          <div className={`${s["header__theme-slider"]} ${currentTheme === "dark" ? s["header__theme-slider--dark"] : ""}`}>
                              {currentTheme === "light" ? <FaSun size={14} /> : <FaMoon size={14} />}
                          </div>
                      </button>
                  </div>
              </div>
          </Container>
      </div>
    );
}

export default Header;
