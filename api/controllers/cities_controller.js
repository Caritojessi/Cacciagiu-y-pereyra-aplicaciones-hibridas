import Location from "../models/locations_model.js";

/**
 * Obtiene una lista de todas las localidades en la colección de MongoDB.
 * @returns Una lista JSON de todas las localidades.
 */
async function getCities() {
    try {
        const cities = await Location.find();
        return cities;
    } catch (error) {
        throw error;
    }
}

/**
 * Obtiene la información completa de una ciudad según su nombre.
 * @param {string} name - El nombre exacto de la localidad que se busca.
 * @returns JSON con toda la información de la ciudad indicada por su nombre.
 */
async function getLocation(name) {
    try {
        const formattedName = name.toLowerCase();
        const city = await Location.findOne({ nombre: { $regex: new RegExp('^' + formattedName, 'i') } });
        return city;
    } catch (error) {
        throw error;
    }
}

/**
 * Obtiene la información completa de una ciudad según su ID.
 * @param {ObjectId} id - El ID de la localidad que se busca.
 * @returns JSON con toda la información de la ciudad indicada por su ID.
 */
async function getLocationById(id) {
    try {
        const localidad = await Location.findById(id);
        if (localidad) {
            return localidad;
        } else {
            return { message: 'Localidad no encontrada' };
        }
    } catch (error) {
        throw error;
    }
}

/**
 * Actualiza la información de una localidad.
 * @param {*} body - Parámetros que se quieren editar en la localidad.
 * @param {ObjectId} id - El ID de la localidad que se quiere editar.
 * @returns La localidad actualizada con los nuevos datos.
 */
async function updateLocation(body, id) {
    try {
        let result = await Location.updateOne({ _id: id }, {
            $set:{
                nombre: body.nombre,
                informacion: body.informacion,
                actividades: body.actividades,
                imagen: body.imagen // Se actualiza la imagen si se proporciona
            }
        });
        return result;
    } catch (error) {
        throw error;
    }
}

/**
 * Elimina una localidad según su ID.
 * @param {ObjectId} id - ID de la ciudad que se quiere eliminar.
 * @returns La eliminación de la localidad indicada.
 */
async function deleteLocation(id) {
    try {
        const result = await Location.deleteOne({ _id: id });
        return result;
    } catch (error) {
        throw error;
    }
}

/**
 * Obtiene una lista de ciudades ordenadas alfabéticamente de forma ascendente por nombre.
 * @returns Lista JSON con las ciudades con su información ordenada alfabéticamente de forma ascendente.
 */
async function sortByNameAsc() {
    try {
        const coleccion = await Location.find().sort({ nombre: 1 });
        return coleccion;
    } catch (error) {
        throw error;
    }
}

/**
 * Obtiene una lista de ciudades ordenadas alfabéticamente de forma descendente por nombre.
 * @returns Lista JSON con las ciudades con su información ordenada alfabéticamente de forma descendente.
 */
async function sortByNameDesc() {
    try {
        const coleccion = await Location.find().sort({ nombre: -1 });
        return coleccion;
    } catch (error) {
        throw error;
    }
}

export { getLocation, updateLocation, deleteLocation, getCities, getLocationById, sortByNameAsc, sortByNameDesc };
