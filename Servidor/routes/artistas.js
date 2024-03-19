const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
//conexión con la base de datos
const {connection} = require("../config/config.db");

const getArtistas = (request, response) => {
    connection.query("SELECT * FROM artistas", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

const postArtista = (request, response) => {
    const { id, biografia, foto, action } = request.body;
    if (!biografia || !foto || !action) {
        response.status(400).json({ error: "Faltan parámetros en la solicitud" });
        return;
    }

    if (action === "insert") {
        connection.query("INSERT INTO artistas (biografia, foto_perfil) VALUES (?, ?)", 
        [biografia, foto],
        (error, results) => {
            if (error) {
                console.error("Error al insertar el usuario:", error);
                response.status(500).json({ error: "Error interno del servidor" });
                return;
            }
            response.status(201).json({ message: "Artista añadido correctamente" });
        });
    } else if (action === "update") {
        if (!id) {
            response.status(400).json({ error: "Falta el ID del usuario en la solicitud para la actualización" });
            return;
        }
        connection.query("UPDATE artistas SET biografia = ?, foto_perfil= ? WHERE usuario_id = ?", 
        [biografia, foto, id],
        (error, results) => {
            if (error) {
                console.error("Error al actualizar el artista:", error);
                response.status(500).json({ error: "Error interno del servidor" });
                return;
            }
            response.status(201).json({ message: "Artista actualizado correctamente" });
        });
    } else {
        response.status(400).json({ error: "Valor de acción no válido en la solicitud" });
    }
};


const delArtista = (request, response) => {
    const id = request.params.id;
    connection.query("DELETE FROM artistas where usuario_id = ?",
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"artista eliminado": results.affectedRows});
    });
};

//ruta
app.route("/artistas").get(getArtistas);
app.route("/artistas").post(postArtista);
app.route("/artistas/:id").delete(delArtista);
module.exports = app;


/*aqui va mi primer post*/



