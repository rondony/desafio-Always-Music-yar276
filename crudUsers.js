import pool from "./database.js"

const consultarDB = (consulta) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await pool.query(consulta);

            resolve(result);
        } catch (error) {
            console.log(error);
            reject("No se pudo traer la información de los usuarios");
        }
    });
};

// Crear una función asíncrona para obtener por consola todos los estudiantes registrados. //

const getUsers = async () => {
    try {
        let query = "SELECT * FROM USERS ORDER BY id";
        let results = await consultarDB(query);
        let usuarios = results.rows;
        return usuarios
    } catch (error) {
        console.log(error);
        throw new Error("Error al traer los datos de usuario.");
    }
};


const getUsersById = async (id) => {
    try {
        const query = {
            text: "SELECT * FROM USERS WHERE ID = $1",
            values: [id],
        };
        let results = await consultarDB(query);
        let usuario = results.rows[0];
        return usuario
    } catch (error) {
        console.log(error);
        throw new Error("Error al intentar filtrar el usuario por id.");
    }
};

const getUsersByRut = async (rut) => {
    try {
        const query = {
            text: "SELECT * FROM USERS WHERE Rut = $1",
            values: [rut],
        };
        let results = await consultarDB(query);
        let usuario = results.rows[0];
        return usuario
    } catch (error) {
        console.log(error);
        throw new Error("Error al intentar filtrar el usuario por rut.");
    }
};

// Crear una función asíncrona para registrar un nuevo estudiante en la base de datos. //

const addUser = async (user) => {
    try {
        const query = {
            text: "INSERT INTO users (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING id, nombre, rut, curso, nivel",
            values: [user.nombre, user.rut, user.curso, user.nivel],
        };

        let results = await consultarDB(query);
        let usuario = results.rows[0];
        return usuario
    } catch (error) {
        console.log(error);
        throw new Error("Error al intentar agregar un nuevo usuario");
    }
};

const deleteUser = async (id) => {
    try {
        const query = {
            text: "DELETE FROM USERS WHERE ID = $1 RETURNING id, nombre, rut, curso, nivel",
            values: [id],
        };

        let results = await consultarDB(query);
        let usuario = results.rows[0];
        return usuario;
    } catch (error) {
        console.log(error);
        throw new Error("Error al intentar eliminar al usuario.");
    }
};

// Crear una función asíncrona para actualizar los datos de un estudiante en la base de datos. //
const updateUser = async (user) => {
    try {
        const query = {
            text: "UPDATE users SET nombre=$2, rut=$3, curso=$4, nivel=$5 WHERE id = $1 RETURNING id, nombre, rut, curso, nivel",
            values: [user.id, user.nombre, user.rut, user.curso, user.nivel],
        };

        let results = await consultarDB(query);
        let usuario = results.rows[0];
        return usuario
    } catch (error) {
        console.log(error);
        throw new Error("Error al intentar actualizar al usuario.");
    }
};

let usersCRUD = {
    getUsers,
    getUsersById,
    addUser,
    deleteUser,
    updateUser,
    getUsersByRut
};

export default usersCRUD;