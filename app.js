const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");

const app = express();

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'asdc'
});
con.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: "secreto",
    resave: false,
    saveUninitialized: true
}));

function verificarSesion(req, res, next) {
    if (req.session.usuario) {
        return next();
    }
    res.redirect("/login");
}

app.get("/login", (req, res) => {
    res.send(`
        <form action="/login" method="post">
            <label>Usuario:</label>
            <input type="text" name="usuario" required>
            <label>Contraseña:</label>
            <input type="password" name="contrasena" required>
            <button type="submit">Iniciar sesión</button>
        </form>
    `);
});

app.post("/login", (req, res) => {
    const { usuario, contrasena } = req.body;

    con.query("SELECT * FROM usuarios WHERE username = ?", [usuario], (err, resultados) => {
        if (err) return res.status(500).send("Error en la base de datos");

        if (resultados.length > 0) {
            bcrypt.compare(contrasena, resultados[0].password, (err, coincide) => {
                if (err) return res.status(500).send("Error en la verificación");

                if (coincide) {
                    req.session.usuario = usuario;
                    return res.redirect("https://www.youtube.com/watch?v=1WKN8uwct74");

                } else {
                    return res.send("Credenciales incorrectas");
                }
            });
        } else {
            return res.send("Usuario no encontrado");
        }
    });
});

app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});
app.get("/register", (req, res) => {
    res.send(`
        <form action="/register" method="post">
            <label>Usuario:</label>
            <input type="text" name="usuario" required>
            <label>Contraseña:</label>
            <input type="password" name="contrasena" required>
            <button type="submit">Registrarse</button>
        </form>
    `);
});
app.post("/register", (req, res) => {
    const { usuario, contrasena } = req.body;

    bcrypt.hash(contrasena, 10, (err, hash) => {
        if (err) return res.status(500).send("Error al encriptar la contraseña");

        con.query("INSERT INTO usuarios (username, password) VALUES (?, ?)", [usuario, hash], (err, resultado) => {
            if (err) return res.status(500).send("Error al registrar usuario");

            res.send("Usuario registrado con éxito. <a href='/login'>Iniciar sesión</a>");
        });
    });
});

app.get("/", verificarSesion, (req, res) => {
    res.send(`Bienvenido, ${req.session.usuario} <a href="/logout">Cerrar sesión</a>`);
});
app.post('/agregarUsuario', (req, res) => {
    let nombre = req.body.nombre
    let nombre2 = req.body.nombre2
    let nombre3 = req.body.nombre3
    let nombre4 = req.body.nombre4
    let nombre5 = req.body.nombre5
    let nombre6 = req.body.nombre6
    let nombre7 = req.body.nombre7
    let nombre8 = req.body.nombre8

    con.query('INSERT INTO usuario (nombre, nombre2, nombre3, nombre4, nombre5, nombre6, nombre7, nombre8) VALUES (?, ?, ?, ?, ?, ? , ?, ?)', 
    [nombre, nombre2, nombre3, nombre4, nombre5, nombre6, nombre7, nombre8], (err, respuesta, fields) => {
        if (err) {
            console.log("Error al conectar", err);
            return res.status(500).send("Error al conectar");
        }

        return res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Información del Usuario</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body class="bg-light">
            <div class="container mt-5">
                <div class="card shadow-lg p-4">
                    <h2 class="text-center text-primary mb-4">Información del Jugador</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Nombre:</strong> ${nombre}</li>
                        <li class="list-group-item"><strong>País:</strong> ${nombre2}</li>
                        <li class="list-group-item"><strong>Número:</strong> ${nombre3}</li>
                        <li class="list-group-item"><strong>Equipo:</strong> ${nombre4}</li>
                        <li class="list-group-item"><strong>Costo:</strong> ${nombre5}</li>
                        <li class="list-group-item"><strong>Venta:</strong> ${nombre6}</li>
                        <li class="list-group-item"><strong>Reside:</strong> ${nombre7}</li>
                        <li class="list-group-item"><strong>Goles:</strong> ${nombre8}</li>
                    </ul>
                    <div class="text-center mt-4">
                        <a href="/" class="btn btn-primary">Volver al Inicio</a>
                    </div>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
        `);
    });
})

app.get('/obtenerUsuario', (req, res) => {
    con.query('SELECT * FROM usuario', (err, resultados) => {
        if (err) {
            console.error("Error al obtener usuarios", err);
            return res.status(500).send("Error al obtener usuarios");
        }

        let respuestaHTML = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Lista de Usuarios</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body class="bg-light">
            <div class="container mt-5">
                <div class="card shadow-lg p-4">
                    <h2 class="text-center text-primary mb-4">Lista de Jugadores</h2>
                    <ul class="list-group">`;
    
    resultados.forEach(usuario => {
        respuestaHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong>ID:</strong> ${usuario.id} | <strong>Nombre:</strong> ${usuario.nombre}
                </div>
                <div class="d-flex">
                    <form action="/editarUsuario/${usuario.id}" method="post" class="me-2 d-flex">
                        <input type="text" name="nombre" value="${usuario.nombre}" class="form-control form-control-sm me-2" required>
                        <button type="submit" class="btn btn-warning btn-sm">Editar</button>
                    </form>
                    <form action="/eliminarUsuario/${usuario.id}" method="post">
                        <button type="submit" class="btn btn-danger btn-sm">Eliminar</button>
                    </form>
                </div>
            </li>`;
    });
    
    respuestaHTML += `
                    </ul>
                    <div class="text-center mt-4">
                        <a href="/" class="btn btn-primary">Volver al Inicio</a>
                    </div>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
    `;  
    
        respuestaHTML += "</ul>";

        res.send(respuestaHTML);
    });
});

app.post('/eliminarUsuario/:id', (req, res) => {
    const userId = req.params.id;

    con.query('DELETE FROM usuario WHERE id = ?', [userId], (err, respuesta) => {
        if (err) {
            console.error("Error al eliminar usuario", err);
            return res.status(500).send("Error al eliminar usuario");
        }

        if (respuesta.affectedRows > 0) {
            return res.redirect('/obtenerUsuario'); 
        } else {
            return res.send(`<h1>No se encontró un usuario con ID ${userId}.</h1>`);
        }
    });
});

app.post('/editarUsuario/:id', (req, res) => {
    const userId = req.params.id;
    const nuevoNombre = req.body.nombre;

    con.query('UPDATE usuario SET nombre = ? WHERE id = ?', [nuevoNombre, userId], (err, respuesta) => {
        if (err) {
            console.error("Error al actualizar usuario", err);
            return res.status(500).send("Error al actualizar usuario");
        }

        if (respuesta.affectedRows > 0) {
            return res.redirect('/obtenerUsuario'); 
        } else {
            return res.send(`<h1>No se encontró un usuario con ID ${userId}.</h1>`);
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000')
})