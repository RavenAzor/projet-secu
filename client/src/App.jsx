// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import ReservationPage from "./pages/ReservationPage";
import GalleryPage from "./pages/GalleryPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
  <AuthProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/galerie" element={<GalleryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Page protégée: nécessite d'être connecté */}
        <Route
          path="/reservations"
          element={
            <ProtectedRoute>
              <ReservationPage />
            </ProtectedRoute>
          }
        />
        {/* Page à protéger pour n'etre qu'accessible aux admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  </AuthProvider>
);

export default App;
