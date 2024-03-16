import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Asegúrate de tener tus estilos CSS importados

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
        console.log("Clicked menu");
    };

    return (
        <nav className={`nav ${isScrolled ? 'affix' : ''}`}>
            <div className="container">
                <div className="logo">
                    <a href="#">Your Logo</a>
                </div>
                <div id="mainListDiv" className={`main_list ${isMenuOpen ? 'show_list' : ''}`}>
                    <ul className="navlinks">
                        <li><a href="#">About</a></li>
                        <li><a href="#">Portfolio</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <span className="navTrigger" onClick={handleMenuClick}>
                    <i>About</i>
                    <i>About</i>
                    <i>About</i>
                </span>
            </div>
        </nav>
    );
};

export default Navbar;
