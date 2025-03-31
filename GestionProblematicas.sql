CREATE DATABASE IF NOT EXISTS GestionProblematicas;
USE GestionProblematicas;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);

-- Tabla de alcaldías
CREATE TABLE IF NOT EXISTS Alcaldias (
    id_alcaldia INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

-- Tabla de problemáticas
CREATE TABLE IF NOT EXISTS Problematicas (
    id_problematica INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_reporte TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT,
    id_alcaldia INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE SET NULL,
    FOREIGN KEY (id_alcaldia) REFERENCES Alcaldias(id_alcaldia) ON DELETE SET NULL
);

-- Insertar algunos datos de ejemplo
INSERT INTO Usuarios (nombre, correo, contrasena) VALUES 
('Juan Pérez', 'juan.perez@example.com', 'hashed_password1'),
('María López', 'maria.lopez@example.com', 'hashed_password2');

INSERT INTO Alcaldias (nombre) VALUES 
('Alcaldía 1'),
('Alcaldía 2');

INSERT INTO Problematicas (titulo, descripcion, id_usuario, id_alcaldia) VALUES 
('Baches en la calle', 'Se reportan baches en la calle principal', 1, 1),
('Alumbrado público', 'Falta de alumbrado en el parque central', 2, 2);
