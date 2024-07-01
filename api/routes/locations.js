import express from "express"
import { getLocation, updateLocation, deleteLocation, getCities, getLocationById, sortByNameAsc, sortByNameDesc } from "../controllers/cities_controller.js"
import verificarToken from "../middlewares/auth_middle.js"


const router = express.Router();

// LISTA JSON CON TODAS LAS LOCALIDADES Y SU INFORMACIÓN
router.get('/localidades', verificarToken, (req, res) => {

    let result = getCities();
    result
        .then((cities) => {res.status(200).json(cities)})
        .catch((error) => {res.status(400).json(error)})
})

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
router.put('/', verificarToken, async (req, res) => {
    let body = req.body;
    let id = body._id
    try {
        const result = await updateLocation(body, id);
        res.status(200).json({ message: "Localidad actualizada correctamente" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// ELIMINA UNA CIUDAD ¡CIUDADO CON BORRAR CIUDADES CON INFORMACION POR FAVOR! USAR EJEMPLOS/PRUEBAS
router.delete('/', verificarToken, async (req, res) => {
    let id = req.body._id
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