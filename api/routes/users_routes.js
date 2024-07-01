import express from "express"
import Joi from "joi"
import verificarToken from '../middlewares/auth_middle.js'
import { getUsers, createUser, updateUser, agregarViaje, deleteUser } from "../controllers/usuarios_controller.js"
import path from "path"

const ruta = express.Router();

const schema = Joi.object({
    nombre: Joi.string()
                .alphanum()
                .min(3)
                .max(8)
                .required(),
    password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,8}$')),
    email: Joi.string()
                .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}),
})

ruta.get('/login', (req, res) => {
    res.sendFile('./views/login.html', {root: path.resolve()}) 
})


ruta.get("/users", (req, res) => {
    let resultado = getUsers();
    resultado
    .then((users) => {res.status(200).json(users)})
    .catch((error) => {res.status(400).json(error)})
})

ruta.post("/register", async (req, res) => {
    const body = req.body;

    // Validación del esquema
    const { error, value } = schema.validate({ nombre: body.nombre, email: body.email, password: body.password });

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    
    try {
        const user = await createUser(value);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

ruta.get('/', verificarToken, getUsers);


ruta.put("/:id", async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const updatedUser = await updateUser(body, id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

ruta.post("/:id/nuevo-viaje", (req, res) => {
    let body = req.body;
    let resultado = agregarViaje(req.params.id, body);

    resultado
        .then((user) => {res.status(201).json(user)})
        .catch((error) => {res.status(400).json(error)})
})

ruta.delete('/eliminar/:id', verificarToken, deleteUser)


export default ruta;