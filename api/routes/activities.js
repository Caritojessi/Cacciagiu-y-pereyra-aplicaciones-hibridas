import express from "express"
import { getActivities, getActivityLocation, sortByPriceAsc, sortByPriceDesc,  dobleFiltro, updateActividad, deleteActividad, getActivityById,paginacion, getActivityByName } from "../controllers/activities_controller.js"
import verificarToken from "../middlewares/auth_middle.js"

const router = express.Router()


// LISTA JSON DE TODAS LAS ACTIVIDADES

router.get('/actividades', verificarToken, (req, res) => {

    let result = getActivities();
    result
        .then((activity) => {res.status(200).json(activity)})
        .catch((error) => {res.status(400).json(error)})
   
})

// LISTA JSON DE LAS ACTIVIDADES POR CIUDAD

router.post("/:ciudad", verificarToken, (req, res) => {
    
    let body = req.body

    let ciudad = body.ciudad

    let result = getActivityLocation(ciudad);
    result
        .then((activities) => {res.status(200).json(activities)})
        .catch((error) => {
        console.log(error.message);
        res.status(500).json({ errCode: 500, msg: error.message });
    });
});

// LISTA JSON DE UNA ACTIVIDAD POR SU ID

router.post('/id/:id', verificarToken, (req, res) => {
    let body = req.body
    let id = body._id;
    let result = getActivityById(id)
    result 
        .then((location) => {res.status(200).json(location)})
        .catch((error) => {res.status(400).json(error)})
})

// LISTA JSON DE LAS ACTIVIDADES POR PRECIO ASCENDENTE
            
router.get('/orden/ascendente', verificarToken, (req, res) => {
    
    let result = sortByPriceAsc();
    result
    .then((activity) => {res.status(200).json(activity)})
    .catch((error) => {res.status(400).json(error)})
})

// LISTA JSON DE LA ACTIVIDADES POR PRECIO DESCENDENTE

router.get('/orden/descendente', verificarToken, (req, res) => {
    
    let result = sortByPriceDesc();
    result
    .then((activity) => {res.status(200).json(activity)})
    .catch((error) => {res.status(400).json(error)})
})


// LISTA JSON DE LAS ACTIVIDADES FILTRANDO POR CIUDAD Y ESTRELLAS DE LA ACTIVIDAD

router.post('/filtrado/', verificarToken, (req, res) => {
    try {
        let body = req.body
        
        let ciudad = body.ciudad
        let estrellas = body.estrellas
        
        let result = dobleFiltro(ciudad, estrellas)
        result
        .then((activity) => {res.status(200).json(activity)})
        .catch((activity) => {res.status(400).json(activity)})
    } catch (error) {
        res.status(400).json({error: 'error al obtener la actividad'})
    }
})

// EDITA EL CONTENIDO DE UNA ACTIVIDAD

router.put('/', verificarToken, async (req, res) => {
    let body = req.body
    
    let id = body._id
    
    try {
        let result = await updateActividad(body, id);
        res.status(200).json({ message: "Actividad actualizada correctamente" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ELIMINA UNA ACTIVIDAD ¡CIUDADO CON BORRAR ACTIVIDADES CON INFORMACION POR FAVOR! USAR EJEMPLOS/PRUEBAS
router.delete('/', verificarToken, async (req, res) => {
    let id = req.body._id
    try {
        const result = await deleteActividad(id);
        res.status(200).json({ message: "Actividad eliminada correctamente" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// LISTA JSON DE LAS ACTIVIDADES POR PÁGINAS; :page RECIBE LA PÁGINA QUE SE QUIERE VER; :pageSize RECIBE LA CANTIDAD DE ACTIVIDADES QUE SE VEN POR PÁGINA

router.get('/paginas/:page/:pageSize', verificarToken, (req, res) => {
    
    let page = parseInt(req.params.page) || 1; // Número de página, por defecto 1
    let pageSize = parseInt(req.params.pageSize) || 5; // Tamaño de la página, por defecto 5
    
    try {
        let result = paginacion(page, pageSize)
        result
        .then((activity) => {res.status(200).json(activity)})
        .catch((error) => {res.status(400).json(error)})
    }catch(error){
        res.status(400).json({error: 'Error al paginar la información'})
    } 
});

// TRAE LA INFORMACION DE UNA ACTIVIDAD POR SU NOMBRE SIN LA NECESIDAD DE QUE SEA EXACTO
router.post('/nombre/', async (req, res) => {
    try {
        let body = req.body
        const query = body.query;
        
        let result = await getActivityByName(query);

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ errCode: 404, msg: `No se encontró ninguna actividad o ciudad con el nombre ${query}` });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ errCode: 500, msg: error.message });
    }
});


export default router

