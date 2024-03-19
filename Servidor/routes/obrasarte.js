const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
//conexión con la base de datos
const {connection} = require("../config/config.db");

const getObrasArte = (request, response) => {
    connection.query("SELECT * FROM obrasarte", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

const postObrasArte = (request, response) => {
    const { id, titulo, descripcion, autor_id, imagen, fecha_publicacion, action } = request.body;
    if (!titulo || !descripcion || !autor_id  || !imagen  || !fecha_publicacion  ||  !action) {
        response.status(400).json({ error: "Faltan parámetros en la solicitud" });
        return;
    }

    if (action === "insert") {
        connection.query("INSERT INTO obrasarte (titulo, descripcion, autor_id, imagen, fecha_publicacion) VALUES (?, ?, ?, ?, ?)", 
        [titulo, descripcion, autor_id, imagen, fecha_publicacion],
        (error, results) => {
            if (error) {
                console.error("Error al insertar la obra:", error);
                response.status(500).json({ error: "Error interno del servidor" });
                return;
            }
            response.status(201).json({ message: "Obra añadida correctamente" });
        });
    } else if (action === "update") {
        if (!id) {
            response.status(400).json({ error: "Falta el ID de la obra en la solicitud para la actualización" });
            return;
        }
        connection.query("UPDATE obrasarte SET titulo = ?, descripcion= ?, autor_id = ?, imagen = ?, fecha_publicacion = ? WHERE id = ?", 
        [titulo, descripcion, autor_id, imagen, fecha_publicacion, id],
        (error, results) => {
            if (error) {
                console.error("Error al actualizar la obra:", error);
                response.status(500).json({ error: "Error interno del servidor" });
                return;
            }
            response.status(201).json({ message: "Obra actualizada correctamente" });
        });
    } else {
        response.status(400).json({ error: "Valor de acción no válido en la solicitud" });
    }
};


const delObrasArte = (request, response) => {
    const id = request.params.id;
    connection.query("DELETE FROM obrasarte where id = ?",
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Obra eliminada": results.affectedRows});
    });
};


app.route("/obrasarte").get(getObrasArte);
app.route("/obrasarte").post(postObrasArte);
app.route("/obrasarte/:id").delete(delObrasArte);
module.exports = app;






