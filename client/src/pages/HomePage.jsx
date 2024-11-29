import React from "react";
import { Link } from "react-router-dom";
import Gallery from "../components/Gallery";

const HomePage = () => (
  <div>
    <h1>Bienvenue au Camping 4 Étoiles</h1>
    <p>
      Venez découvrir un endroit chaleureux et naturel dans le sud de la France.
    </p>
    <Gallery />
    <Link to="/reservations">Réservez dès maintenant !</Link>
  </div>
);

export default HomePage;
