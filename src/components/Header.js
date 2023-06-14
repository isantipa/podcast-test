import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
    return (
        <header className="header">
            <Link to="/">
                <h1>podcaster</h1>
            </Link>
        </header>
    );
}

export default Header;