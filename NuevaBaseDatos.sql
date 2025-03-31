CREATE DATABASE IF NOT EXISTS NuevaBaseDatos1;
USE NuevaBaseDatos1;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    telefono VARCHAR(15),
    direccion VARCHAR(255),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de alcaldías
CREATE TABLE IF NOT EXISTS Alcaldias (
    id_alcaldia INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    poblacion INT,
    extension_km2 FLOAT
);

-- Tabla de problemáticas
CREATE TABLE IF NOT EXISTS Problematicas (
    id_problematica INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_reporte TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT,
    id_alcaldia INT,
    id_categoria INT,
    estatus ENUM('Pendiente', 'En Proceso', 'Resuelto') DEFAULT 'Pendiente',
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE SET NULL,
    FOREIGN KEY (id_alcaldia) REFERENCES Alcaldias(id_alcaldia) ON DELETE SET NULL,
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria) ON DELETE SET NULL
);

-- Tabla de categorías de problemáticas
CREATE TABLE IF NOT EXISTS Categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT
);

-- Tabla de comentarios sobre problemáticas
CREATE TABLE IF NOT EXISTS Comentarios (
    id_comentario INT AUTO_INCREMENT PRIMARY KEY,
    id_problematica INT,
    id_usuario INT,
    comentario TEXT NOT NULL,
    fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_problematica) REFERENCES Problematicas(id_problematica) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE SET NULL
);

-- Tabla de imágenes asociadas a problemáticas
CREATE TABLE IF NOT EXISTS Imagenes (
    id_imagen INT AUTO_INCREMENT PRIMARY KEY,
    id_problematica INT,
    url_imagen VARCHAR(255) NOT NULL,
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_problematica) REFERENCES Problematicas(id_problematica) ON DELETE CASCADE
);

-- Tabla de responsables de la solución de problemáticas
CREATE TABLE IF NOT EXISTS Responsables (
    id_responsable INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cargo VARCHAR(100),
    telefono VARCHAR(15),
    correo VARCHAR(100) UNIQUE NOT NULL
);

-- Tabla de asignaciones de problemáticas a responsables
CREATE TABLE IF NOT EXISTS Asignaciones (
    id_asignacion INT AUTO_INCREMENT PRIMARY KEY,
    id_problematica INT,
    id_responsable INT,
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_problematica) REFERENCES Problematicas(id_problematica) ON DELETE CASCADE,
    FOREIGN KEY (id_responsable) REFERENCES Responsables(id_responsable) ON DELETE SET NULL
);

-- Insertar algunos datos de ejemplo
INSERT INTO Usuarios (nombre, correo, contrasena, telefono, direccion) VALUES 
('Juan Pérez', 'juan.perez@example.com', 'hashed_password1', '5551234567', 'Calle Falsa 123'),
('María López', 'maria.lopez@example.com', 'hashed_password2', '5557654321', 'Avenida Siempre Viva 742');

INSERT INTO Alcaldias (nombre, poblacion, extension_km2) VALUES 
('Alcaldía 1', 500000, 45.3),
('Alcaldía 2', 750000, 60.1);

INSERT INTO Categorias (nombre, descripcion) VALUES 
('Infraestructura', 'Problemas relacionados con calles, baches, puentes, etc.'),
('Seguridad', 'Reportes de delitos, vandalismo, etc.'),
('Servicios públicos', 'Fallas en alumbrado, agua, recolección de basura, etc.');

INSERT INTO Problematicas (titulo, descripcion, id_usuario, id_alcaldia, id_categoria, estatus) VALUES 
('Baches en la calle', 'Se reportan baches en la calle principal', 1, 1, 1, 'Pendiente'),
('Alumbrado público', 'Falta de alumbrado en el parque central', 2, 2, 3, 'En Proceso');
