import express from "express"
import mongoose from "mongoose";
import "dotenv/config"

//conexión ddbb
mongoose
    .connect(process.env.MONGO_DEPLOY)
    .then(() => console.log('Connected ddbb'))
    .catch(() => console.log('Error to connect ddbb'))


// instancia de express
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('views'))

// import rutas de datos

import locationsRoutes from "./routes/locations.js"
import activitesRoutes from "./routes/activities.js"
import usersRoutes from "./routes/users_routes.js"
import auth from "./routes/auth.js"

// USUARIOS  

/**
 * user: Juani
 * password: Juan123
 * email: juani@gmail.com 
 * -------------------------
 * user: Caro
 * password: Caro123
 * email: caro@gmail.com
 */
app.get('/login', usersRoutes)
app.post('/login', auth)
app.post('/usuarios/nuevo', usersRoutes)

// VISTAS DATA
app.get('/localidades', locationsRoutes)
app.get('/actividades', activitesRoutes)


// API JSON LOCALIDADES
app.get('/api/localidades', locationsRoutes) // lista todas las localidades
app.get('/api/localidades/orden/ascendente', locationsRoutes); // lista las localidades por orden alfabético desde la 'A'
app.get('/api/localidades/orden/descendente', locationsRoutes); // list las localidades por orden alfabético desde la 'Z'
app.post('/api/localidades/:nombre', locationsRoutes) // info de una localidad por su nombre
app.post('/api/localidades/id/', locationsRoutes) // trae info de una localidad por su id
app.put('/api/localidades/', locationsRoutes); // modifica algún valor de la localidad
app.delete('/api/localidades/', locationsRoutes); // elimina una ciudad, ¡NO BORRAR CIUDADES COMPLETAS POR FAVOR! Usar los ejemplos/pruebas

// API JSON ACTIVIDADES
app.get('/api/actividades', activitesRoutes) // lista todas las actividades
app.get('/api/actividades/orden/ascendente', activitesRoutes) // lista las actividades por orden de precio de menor a mayor
app.get('/api/actividades/orden/descendente', activitesRoutes) // lista las actividades por orden de precio de mayor a menor
app.get('/api/actividades/paginas/:page/:pageSize', activitesRoutes) // lista de actividades por páginas, se envían por parametro el :page número de página a ver y :pageSize, la cantidad de actividades que se quieren ver por página
app.post('/api/actividades/ciudad/', activitesRoutes) // lista todas las actividades de una ciudad
app.post('/api/actividades/filtrado/', activitesRoutes) // lista actividades por doble filtrado
app.post('/api/actividades/id/', activitesRoutes) // trae info de una actividad por su id
app.post('/api/actividades/nombre/', activitesRoutes) // trae una actividad por su nombre, sin necesidad de ser el nombre exácto
app.put('/api/actividades/', activitesRoutes) // modifica la info de una actividad
app.delete('/api/actividades/', activitesRoutes) // elimina una actividad, ¡NO BORRAR ACTIVIDADES COMPLETAS POR FAVOR! Usar los ejemplos/pruebas


app.listen(process.env.PORT, function() {
    console.log("server running...");
})