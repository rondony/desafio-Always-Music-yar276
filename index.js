// IMPORTACIÓN DE DEPENDENCIAS //
import express from 'express';
import usersCRUD from './crudUsers.js';


import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// MIDDLEWARES GENERALES //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DEJAR PÚBLICA LA CARPETA PUBLIC //
app.use(express.static('public'));


//ENCENDEMOS SERVIDOR //
app.listen(3000, () => {
    console.log("Servidor escuchando en http://localhost:3000")
})

//RUTA PÁGINA PRINCIPAL //
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./public/index.html"));
});


//ENDPPINTS (API) //
app.get("/api/users", async (req, res) => {
    try {
        let usuarios = await usersCRUD.getUsers();

        res.json({
            message: "Todo ok",
            usuarios,
            cantidad: usuarios.length
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
});

//endpoint buscar usuarios por id //
app.get("/api/users/:id", async (req, res) => {
    try {

        let { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Debe proporcionar el ID del usuario que desea buscar."
            })
        }
        let usuario = await usersCRUD.getUsersById(id);

        if (!usuario) {
            return res.status(404).json({
                message: "Usuario no encontrado con ID: " + id
            })
        }
        res.json({
            message: "Todo ok",
            usuario,
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        })
    }
});

// Endpoint buscar usuarios por rut //
app.get("/api/users/:rut", async (req, res) => {
    try {

        let { rut } = req.params;

        if (!rut) {
            return res.status(400).json({
                message: "Debe proporcionar el Rut del usuario que desea buscar."
            })
        }
        let usuario = await usersCRUD.getUsersById(rut);

        if (!usuario) {
            return res.status(404).json({
                message: "Usuario no encontrado con Rut: " + rut
            })
        }
        res.json({
            message: "Todo ok",
            usuario,
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        })
    }
});

// Endpoint para eliminar usuarios por ID //
app.delete("/api/users/:id", async (req, res) => {
    try {

        let { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Debe proporcionar el ID del usuario que desea eliminar"
            })
        }
        let usuario = await usersCRUD.getUsersById(id);

        if (!usuario) {
            return res.status(404).json({
                message: "Usuario no encontrado con ID: " + id
            })
        }

        // SI USUARIO EXISTE LO ELIMINAMOS //
        await usersCRUD.deleteUser(id);

        res.json({
            message: "Usuario eliminado con éxito",
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        })
    }
});

// ENDPOINT PARA CREAR UN NUEVO USUARIO //
app.post("/api/users", async (req, res) => {
    try {
        let { nombre, rut, curso, nivel } = req.body;

        if (!nombre || !rut || !curso || !nivel) {
            return res.status(400).json({
                message: "Debe proporcionar todos los datos solicitados [nombre, rut, curso, nivel]"
            })
        }

        let newUser = {
            nombre, rut, curso, nivel
        }

        let user = await usersCRUD.addUser(newUser);

        res.status(201).json({
            message: "Usuario creado con éxito.",
            user
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        })
    }
})

// ENDPOINT PARA ACTUALIZAR UN USUARIO //
app.put("/api/users", async (req, res) => {
    try {
        let { id, nombre, rut, curso, nivel } = req.body;

        if (!id || !nombre || !rut || !curso || !nivel) {
            return res.status(400).json({
                message: "Debe proporcionar todos los datos solicitados [id, nombre, rut, cursoo, nivel]"
            })
        }

        let user = await usersCRUD.getUsersById(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado con ID: " + id
            })
        }

        user.nombre = nombre;
        user.rut = rut;
        user.curso = curso;
        user.nivel = nivel;

        await usersCRUD.updateUser (user);

        res.status(201).json({
            message: "Usuario actualizado con éxito.",
            user
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        })
    }
})