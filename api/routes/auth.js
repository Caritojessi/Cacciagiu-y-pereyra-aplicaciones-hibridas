import Usuario from "../models/usuario_model.js"
import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"

const ruta= express.Router()

ruta.post('/login', (req, res)=>{
    Usuario.findOne({email: req.body.email})
    .then (data => {
        if (data) {
            const passValido = bcrypt.compareSync(req.body.password, data.password);

            if (!passValido) return res.status(400).json({ message: "Contraseña incorrecta" });

            const jwtoken = jwt.sign({
                usuario: {
                    _id: data._id,
                    nombre: data.nombre,
                    email: data.email
                }
            }, process.env.SEED, { expiresIn: process.env.EXPIRATION });

            res.status(201).json({
                usuario: {
                    _id: data._id,
                    nombre: data.nombre,
                    email: data.email
                },
                jwtoken
            });
        } else {
            return res.status(404).json({ message: "Correo electrónico no encontrado" });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    });
})


export default ruta;
