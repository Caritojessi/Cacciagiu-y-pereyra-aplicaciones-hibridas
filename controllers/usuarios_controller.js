import Usuario from "../models/usuario_model.js"
import bcrypt from "bcrypt"


async function getUsers(){
    let usuarios = await Usuario.find();
    // let usuarios = await Usuario.find({estado: true});
    return usuarios;
}


async function createUser(body){
   let user = new Usuario({
        nombre: body.nombre,
        password: bcrypt.hashSync(body.password, 10),
        email: body.email,
        estado: true
   })
   return await user.save();
}


async function updateUser(body, email){
    console.log(body)
    console.log(email)
    let user = new Usuario.updateOne({"email":email}, {
        $set:{
        nombre: body.nombre,
        password: body.password
       }
   })
   
    return user;
 }




export { getUsers, createUser, updateUser}