import Usuario from "../models/usuario_model.js"
import express from "express"
import bcrypc from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"

const ruta= express.Router()

ruta.post ('/login', (req, res)=>{
    Usuario.findOne({email: req.body.email})
    .then (data => {
        if(data){
            const passValido= bcrypc.compareSync (req.body.password, data.password)
            
            if (!passValido) return res.status(400).json({msj: "password incorrecto"});            
            const jwtoken = jwt.sign({
                usuario:
                {
                    _id:data._id,
                    nombre:data.nombre,
                    email:data.email
                }
            }, process.env.SEED, {expiresIn: process.env.EXPIRATION})
                res.json({
                    usuario: {
                        _id: data._id,
                        nombre: data.nombre,
                        email: data.email
                    }, jwtoken
                })
            }else{
                res.redirect('/login')
            }
        }
    )
    .catch(error => {
        console.error((error));
        res.redirect("/login?error")
    })
    }
)


export default ruta;
