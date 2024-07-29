import express from "express"
import { getLocation, updateLocation, deleteLocation, getCities, getLocationById, sortByNameAsc, sortByNameDesc, createCity } from "../controllers/cities_controller.js"
import verificarToken from "../middlewares/auth_middle.js"
import multer from "multer";
import path from 'path'

const router = express.Router();

// LISTA JSON CON TODAS LAS LOCALIDADES Y SU INFORMACIÓN
router.get('/localidades', verificarToken, (req, res) => {

    let result = getCities();
    result
        .then((cities) => {res.status(200).json(cities)})
        .catch((error) => {res.status(400).json(error)})
})


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        const filename = uniqueSuffix + fileExtension;
        req.savedFilename = filename; // Guardar el nombre de archivo en la solicitud para usarlo más tarde
        cb(null, filename);
    }
});

const upload = multer({ storage: storage});


// CREAR UNA NUEVA CIUDAD
router.post('/nueva-ciudad', verificarToken, upload.single('image'), createCity);


// JSON CON LA INFORMACIÓN DE LA LOCALIDAD DEFINIDA POR SU NOMBRE
router.post('/:nombre', verificarToken, async (req, res) => {
    
    let body = req.body
    let ciudad = body.ciudad
    try {
        if (ciudad) { 
            const city = await getLocation(ciudad);
            if (!city) {
                res.status(404).json({ error: 'Ciudad no encontrada'})
                return;
            }
            res.status(200).json(city);
        } else {
            const cities = await getCities()
            res.status(200).json(cities)
        }
    } catch (error) {
        res.status(400).json({ error : error.message })
    }
})

// JSON CON LA INFORMACIÓN DE LA LOCALIDAD DEFINIDA POR SU ID
router.post('/id/', verificarToken, (req, res) => {

    let body = req.body
    let id = body._id;
    let result = getLocationById(id)
    result 
        .then((location) => {res.status(200).json(location)})
        .catch((error) => {res.status(400).json(error)})
})


//EDITA EL CONTENIDO DE UNA LOCALIDAD
router.put('/:id', verificarToken, upload.single('image'), updateLocation);


// ELIMINA UNA CIUDAD ¡CIUDADO CON BORRAR CIUDADES CON INFORMACION POR FAVOR! USAR EJEMPLOS/PRUEBAS
router.delete('/:id', verificarToken, async (req, res) => {
    let id = req.params.id
    // console.log(id);
    try {
        const result = await deleteLocation(id);
        res.status(200).json({ message: "Localidad eliminada correctamente" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// LISTA DE JSON DE LAS LOCALIDADES ORDENADAS POR ORDEN ALFABETICO ASCENDENTE
router.get('/orden/ascendente', verificarToken, (req, res) => {

    let result = sortByNameAsc();
    result
        .then((cities) => {res.status(200).json(cities)})
        .catch((error) => {res.status(400).json(error)})
})

// LIST DE JSON DE LAS LOCALIDADES ORDENADAS POR ORDEN ALFABETICO DESCENDENTE
router.get('/orden/descendente', verificarToken, (req, res) => {

    let result = sortByNameDesc();
    result
        .then((cities) => {res.status(200).json(cities)})
        .catch((error) => {res.status(400).json(error)})
})





export default router