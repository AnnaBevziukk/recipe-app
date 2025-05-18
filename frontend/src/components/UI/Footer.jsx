import s from './Footer.module.scss';
import Container from "./Container.jsx";

import {FaGithub, FaLinkedin, FaTwitter, FaInstagram} from "react-icons/fa"; // Імпортуємо іконки

const Footer = () => {
    return (
        <div className={s.footer}>
            <Container>
                <div className={s.footer__content}>
                    <div className={s.footer__social}>
                        <a href="#" target="_blank" rel="noopener noreferrer" className={s.footer__element}>
                            <FaGithub/>
                            Github
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className={s.footer__element}>
                            <FaLinkedin/>
                            LinkedIn
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className={s.footer__element}>
                            <FaTwitter/>
                            Twitter
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className={s.footer__element}>
                            <FaInstagram/>
                            Instagram
                        </a>
                    </div>

                    <div className={s.footer__copyright}>
                        © {new Date().getFullYear()} DonatoMoon. All rights reserved.
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Footer;
