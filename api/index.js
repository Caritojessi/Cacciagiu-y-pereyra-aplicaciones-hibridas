import express from "express"
import mongoose from "mongoose";
import "dotenv/config"
import cors from 'cors'
import locationsRoutes from "./routes/locations.js"
import activitesRoutes from "./routes/activities.js"
import travelsRoutes from "./routes/travels_routes.js"
import usersRoutes from "./routes/users_routes.js"
import auth from "./routes/auth.js"

//conexión ddbb
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Connected ddbb'))
    .catch(() => console.log('Error to connect ddbb'))


// instancia de express
const app = express();

app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('views'))


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
app.use('/users', usersRoutes)
app.get('/login', usersRoutes)
app.post('/login', auth)


// API JSON LOCALIDADES
app.use('/api/localidades', locationsRoutes)

// API JSON ACTIVIDADES
app.use('/api/actividades', activitesRoutes)

// ACCESO A LOS VIAJES
app.use('/viajes', travelsRoutes)



app.listen(process.env.PORT, function() {
    console.log("server running...");
})