import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import s from './NavBar.module.scss';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className={s.nav}>

            <div className={`${s.nav__burger} ${isOpen ? s.active : ""}`} onClick={toggleMenu}>
                <div className={s["nav__burger-line"]}></div>
                <div className={s["nav__burger-line"]}></div>
                <div className={s["nav__burger-line"]}></div>
            </div>

            <ul className={`${s.nav__list} ${isOpen ? s["nav__list--active"] : ''}`}>

                <li className={s.nav__item}>
                    <Link to="/" onClick={() => setIsOpen(false)}>HOME</Link>
                </li>
            </ul>
        </div>
    );
}

export default NavBar;
