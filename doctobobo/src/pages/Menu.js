import React from 'react';
import { Link } from 'react-router-dom';
import '../css/menu.css';

function Menu({ handleLogout }) {
    return (
        <ul className="menu">
            <li><Link to="/">Doctobobo</Link></li>
            <li><Link to="/connection">Se connecter</Link></li>
            <li><Link to="/meeting">Mes rendez-vous</Link></li>
            <li><Link to="/my_space">Mon espace</Link></li>
            <li><button id="logout-btn" onClick={handleLogout}>Se déconnecter</button></li>
        </ul>
    );
}

export default Menu;

