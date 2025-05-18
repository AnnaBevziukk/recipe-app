import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import s from './NavBar.module.scss';

function NavBar({ isLoggedIn, role }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const handleSignOut = () => {
    console.log("Signed out");
    // Додати логіку розлогінення тут
  };

  return (
    <div className={s.nav}>
      <div className={`${s.nav__burger} ${isOpen ? s.active : ""}`} onClick={toggleMenu}>
        <div className={s["nav__burger-line"]}></div>
        <div className={s["nav__burger-line"]}></div>
        <div className={s["nav__burger-line"]}></div>
      </div>

      <ul className={`${s.nav__list} ${isOpen ? s["nav__list--active"] : ''}`}>


        {!isLoggedIn ? (
          <>
            <li className={s.nav__item}>
              <Link to="/signin" onClick={() => setIsOpen(false)}>SIGN IN</Link>
            </li>
            <li className={s.nav__item}>
              <Link to="/signup" onClick={() => setIsOpen(false)}>SIGN UP</Link>
            </li>
          </>
        ) : (
          <>
            <li className={s.nav__item}>
              <Link to="/recipes/new" onClick={() => setIsOpen(false)}>NEW RECIPE</Link>
            </li>
            {role === "moderator" && (
              <li className={s.nav__item}>
                <Link to="/moderation" onClick={() => setIsOpen(false)}>MODERATION</Link>
              </li>
            )}
            <li className={s.nav__item}>
              <button onClick={() => { handleSignOut(); setIsOpen(false); }}>SIGN OUT</button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default NavBar;