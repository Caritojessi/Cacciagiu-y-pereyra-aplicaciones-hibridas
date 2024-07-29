import Usuario from "../models/usuario_model.js"
import bcrypt from "bcrypt"

async function getUsers(){
    let usuarios = await Usuario.find();
    return usuarios;
}

async function getOneUser(id) {
    let user = await Usuario.findById(id); 
    console.log('en la función del backend ',user);
    return user;
}


async function createUser(body){

    let existingUser = await Usuario.findOne({ email: body.email });
    if (existingUser) {
        throw new Error('El correo electrónico ya está en uso.');
    }
    let user = new Usuario({
        nombre: body.nombre,
        password: bcrypt.hashSync(body.password, 10),
        email: body.email,
    });

    return await user.save();
}


async function updateUser(body, id, image) {
    try {
        let updateFields = {
            nombre: body.nombre
        };

        if (body.password) {
            updateFields.password = bcrypt.hashSync(body.password, 10);
        }

        if (image) {
            updateFields.image = image;
        }

        const updatedUser = await Usuario.updateOne({ _id: id }, {
            $set: updateFields
        });

        if (updatedUser.nModified === 0) {
            throw new Error('No se pudo actualizar el usuario. Verifique que el ID sea correcto.');
        }
        return updatedUser;
    } catch (error) {
        throw new Error(error.message);
    }
}

 async function agregarViaje(id, nuevoViaje) {

    try {
        const user = await Usuario.findById(id);

        if (!user) {
            throw new Error('Usuario no encontrado.')
        }

        user.viajes.push(nuevoViaje);

        const result =  await Usuario.save();

        return result;
    } catch(error) {
        throw new Error (`Error al agregar el viaje: ${error.message}`)
    }

 }

 async function deleteUser(req, res) {
    const { id } = req.params;

    try {
        const result = await Usuario.deleteOne({ _id: id });

        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Usuario eliminado correctamente.' });
        } else {
            res.status(404).json({ message: 'No se encontró el usuario para eliminar.' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export { getUsers, createUser, updateUser, agregarViaje, deleteUser, getOneUser}