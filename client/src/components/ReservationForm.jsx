import React, { useState } from "react";
import axios from "axios";

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    emplacement: "",
    type: "",
    dateArrivee: "",
    dateDepart: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/reservations", formData)
      .then((response) => alert("Réservation confirmée !"))
      .catch((err) => alert("Erreur lors de la réservation."));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom:
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
        />
      </label>
      <label>
        E-mail:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Emplacement:
        <select
          name="emplacement"
          value={formData.emplacement}
          onChange={handleChange}
        >
          <option value="emplacement1">Emplacement 1</option>
          <option value="emplacement2">Emplacement 2</option>
          <option value="emplacement3">Emplacement 3</option>
        </select>
      </label>
      <label>
        Type d'hébergement:
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="mobil-home">Mobil-home</option>
          <option value="tente">Tente</option>
          <option value="bungalow">Bungalow</option>
        </select>
      </label>
      <label>
        Date d'arrivée:
        <input
          type="date"
          name="dateArrivee"
          value={formData.dateArrivee}
          onChange={handleChange}
        />
      </label>
      <label>
        Date de départ:
        <input
          type="date"
          name="dateDepart"
          value={formData.dateDepart}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Réserver</button>
    </form>
  );
};

export default ReservationForm;
