import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <div>
    <Link to="/admin/dashboard">Tableau de bord</Link>
    <Link to="/admin/reservations">Réservations</Link>
  </div>
);

export default Navbar;
