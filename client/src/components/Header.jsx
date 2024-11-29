import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header>
    <nav>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/reservations">Réservations</Link>
        </li>
        <li>
          <Link to="/galerie">Galerie</Link>
        </li>
        <li>
          <Link to="/tarifs">Tarifs</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
