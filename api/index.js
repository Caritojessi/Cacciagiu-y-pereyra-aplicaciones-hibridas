import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import multer from "multer";
import path from 'path';
import { fileURLToPath } from "url";
import Images from "./models/image_model.js"; 
import locationsRoutes from "./routes/locations.js";
import activitesRoutes from "./routes/activities.js";
import travelsRoutes from "./routes/travels_routes.js";
import usersRoutes from "./routes/users_routes.js";
import auth from "./routes/auth.js";

// Conexión a la base de datos
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to database'))
  .catch((e) => console.log('Error connecting to database', e));

// Instancia de express
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('views'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Rutas para los usuarios
app.use('/users', usersRoutes);
app.get('/login', usersRoutes);
app.post('/login', auth);

// API JSON Localidades
app.use('/api/localidades', locationsRoutes);

// API JSON Actividades
app.use('/api/actividades', activitesRoutes);

// Acceso a los viajes
app.use('/viajes', travelsRoutes);

// Acceso a las imágenes
app.use('/api/images', express.static(path.join(__dirname, 'images')));

// // Ruta para subir imágenes
// app.post('/upload', upload.single('image'), (req, res) => {
//   res.send({ status: 'Image uploaded successfully', imagePath: `/api/images/${req.file.filename}` });
// });

// Iniciar el servidor
app.listen(process.env.PORT, function () {
  console.log(`Server running on port ${process.env.PORT}...`);
});
