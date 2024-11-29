-- Création de la bdd
CREATE DATABASE IF NOT EXISTS camping_paradise;

-- Sélectionner la bdd
USE camping_paradise;

-- Table des users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,  
  firstName VARCHAR(255) NOT NULL,  
  lastName VARCHAR(255) NOT NULL,    
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,     
  role ENUM('client', 'admin') DEFAULT 'client'
);

-- Table des réservations
CREATE TABLE IF NOT EXISTS reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,          
  clientName VARCHAR(255) NOT NULL,            
  email VARCHAR(255) NOT NULL,                  
  checkInDate DATE NOT NULL,                   
  checkOutDate DATE NOT NULL,                  
  houseType VARCHAR(255) NOT NULL,              
  totalAmount FLOAT NOT NULL,                  
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending', 
  user_id INT NOT NULL,                       
  FOREIGN KEY (user_id) REFERENCES users(id)   
);

CREATE TABLE refresh_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    refresh_token TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO users (firstName, lastName, email, password, role) VALUES
-- ('Cherry', 'Coco', 'cherrycoco@test.com', 'cherrythebest04', 'client'),
-- ('Sam', 'Antha', 'santha@exemple.com', 'samanthaiknow', 'client'),
-- ('Rachid', 'Ouilda', 'ouildarachid@hehe.com', 'bwehehe155', 'admin');

-- INSERT INTO reservations (clientName, email, checkInDate, checkOutDate, houseType, totalAmount) VALUES
-- ('Cherry Coco', 'cherrycoco@test.com', '2024-06-01', '2024-06-07', 'Tente', 120.00),
-- ('Sam Antha', 'santha@exemple.com', '2024-07-10', '2024-07-15', 'Maison de forêt', 350.00)
