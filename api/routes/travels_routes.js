import express from 'express'
import {
    getUserTravels,
    createNewTravel,
    travelById,
    updateSpend,
    updateEvents,
    updateTravel,
    storageTravel,
    deleteSpend,
    modifySpend,
    getSpend
} from '../controllers/travels_controller.js'
import verificarToken from "../middlewares/auth_middle.js"

const travelroutes = express.Router();

travelroutes.get('/:userId', verificarToken, getUserTravels);

travelroutes.post('/agregar', verificarToken, createNewTravel);

travelroutes.get('/detalle/:id', verificarToken, travelById);

travelroutes.put('/modificar/:id', verificarToken, updateTravel)

travelroutes.put('/archivar/:id', verificarToken, storageTravel)

// RUTAS PARA LOS GASTOS

travelroutes.get('/gastos/:viajeId/:id', verificarToken, getSpend);

travelroutes.put('/gastos/:id', verificarToken, updateSpend);

travelroutes.delete('/eliminar-gasto/:id', verificarToken, deleteSpend)

travelroutes.put('/modificar-gasto/:viajeId/:id', verificarToken, modifySpend)

// RUTAS PARA LOS EVENTOS

travelroutes.put('/eventos/:id', verificarToken, updateEvents)

export default travelroutes;