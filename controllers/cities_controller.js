import Location from "../models/locations_model.js"

/**
 * 
 * @returns listado json de todas las localidad en la coleccion de MongoDB
 */
async function getCities() {
    let cities = await Location.find();

    return cities;
}

/**
 * 
 * @param {string} name, nombre exact de la localidad que se busca
 * @returns json con toda la información de la ciudad indicada por su nombre
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
 * 
 * @param {ObjectId} id, el ID de la localidad que se busca 
 * @returns json con toda la información de la ciudad indicada por su ID
 */
async function getLocationById(id) {

    let localidad = Location.findById(id);
        if (localidad) {
            return localidad;
        } else {
            return json('Localidad no encontrada')
        }
}


/**
 * 
 * @param {*} body parámetros que se quieren editar en la localidad 
 * @param {*} id el ID de la localidad que se quiere editar
 * @returns La localidad actualizada con los nuevos datos
 */
async function updateLocation(body, id) {
    try {
        let result = await Location.updateOne({ _id: id }, {
            $set:{
                nombre: body.nombre,
                informacion: body.informacion,
                actividades: body.actividades
            }
        });
        return result;
    } catch (error) {
        throw error;
    }
}


/**
 * 
 * @param {id} id, id de la ciudad que se quiere eliminar 
 * @returns eliminación de la localidad indicada
 */
async function deleteLocation(id) {
    try {
        const result = await Location.deleteOne({ _id: id });
        return result;
    } catch (error) {
        console.error('Error deleting location:', error);
        throw error;
    }
}


/**
 * 
 * @returns lista json con las ciudade con su información ordenadas alfabeticamente de forma ascendente
 */
async function sortByNameAsc() {
    let coleccion = await Location.find().sort({nombre: 1});

    return coleccion;
}

/**
 * 
 * @returns lista json con las ciudade con su información ordenadas alfabeticamente de forma descendente
 */
async function sortByNameDesc() {
    let coleccion = await Location.find().sort({nombre: -1});

    return coleccion;
}




export { getLocation, updateLocation, deleteLocation, getCities, getLocationById, sortByNameAsc, sortByNameDesc }