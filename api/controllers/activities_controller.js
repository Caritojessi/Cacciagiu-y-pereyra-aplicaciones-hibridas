import Activity from "../models/activites_model.js"

/**
 * 
 * @returns todas las actividades con su información de la coleccion de MongoDB
 */
async function getActivities() {
    let activity = await Activity.find();

    return activity;
}

/**
 * const actividad = await Activity.findByIdAndUpdate(id, data, { new: true });
   return actividad;
 */
   async function createActivity(req, res) {
    const { ciudad, direccion, nombre, informacion_general, precio, estrellas } = req.body;
    const image = req.file ? req.file.filename : '';

    // console.log(image); // Verifica que el nombre del archivo esté correctamente asignado

    try {
        const newActivity = new Activity({
            ciudad,
            direccion,
            nombre,
            informacion_general,
            precio,
            estrellas,
            image
        });

        await newActivity.save();
        res.status(201).json(newActivity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


/**
 * 
 * @param {string} ciudad, la ciudad por la que se quiere buscar actividades
 * @returns todas las actividades con su información correspondiente a la ciudad indicada
 */
async function getActivityLocation(ciudad) {

    let coleccion = await Activity.find();

    try {
        let actividades = coleccion.filter(actividades => actividades.ciudad.toLowerCase() === ciudad.toLowerCase())
        if (actividades) {
            return actividades
        }
    } catch (error) {
        throw error
    }
    
}


/**
 * 
 * @returns Actividades por orden ascendente de precios
 */
async function sortByPriceAsc() {
    let coleccion = await Activity.find().sort({precio: 1});

    return coleccion;
}

/**
 * 
 * @returns Actividades por orden descendente de precios
 */
async function sortByPriceDesc() {
    let coleccion = await Activity.find().sort({precio: -1});

    return coleccion;
}


/**
 * 
 * @param {string} ciudad, ciudad en la cual se quieren buscar actividades 
 * @param {number} estrellas, cantidad de estrellas por las que se quiere buscar la actividad
 * @returns Todas las actividades que cumplan ambas condiciones
 */
async function dobleFiltro (ciudad, estrellas) {
    
    let coleccion = await Activity.find({ciudad: ciudad, estrellas: estrellas})
    
    return coleccion
}


/**
 * 
 * @param {body} body, parámetros que se quieren editar en la actividad 
 * @param {ObjectId} id, el ID de la actividad que se quiere editar
 * @returns La actividad actualizada con los nuevos datos
 */
const updateActividad = async (data, id) => {
    try {
        const actividad = await Activity.findByIdAndUpdate(id, data, { new: true });
        return actividad;
    } catch (error) {
        throw new Error('Error al actualizar la actividad: ' + error.message);
    }
};

/**
 * 
 * @param {id} id, id de la actividad que se quiere eliminar 
 * @returns eliminación de la actividad indicada
 */
async function deleteActividad(id) {
    try {
        const result = await Activity.deleteOne({_id: id});
        return result;
    } catch (error) {
        console.error('Error deleting actividad:', error);
        throw error;
    }
}


/**
 * 
 * @param {id} id, ID de la actividad que se busca 
 * @returns la actividad con su información correspondiente al ID indicado
 */
async function getActivityById(id) {
    
    let actividad = Activity.findById(id);
    
    if (actividad) {
        return actividad;
    } else {
        return json('Actividad no encontrada')
    }
}


/**
 * 
 * @param {number} page, el número de página que se quiere ver 
 * @param {number} pageSize, la cantidad de actividades que se quieren ver por página
 * @returns La cantidad de actividades indicadas en la página indicada
 */
async function paginacion(page, pageSize) {

    // calcula el índice inicial y final del rango de documentos
    let startIndex = (page - 1) * pageSize;
    let endIndex = startIndex + pageSize;

    // obtiene los datos en el rango especificado
    let actividades = await Activity.find()
    let datosPaginados = actividades.slice(startIndex, endIndex)

    return datosPaginados;
}


/**
 * 
 * @param {string} query, Parte del nombre de la actividad que se quiere buscar 
 * @returns la actividad con su información con el nombre indicado
 */
async function getActivityByName(query) {
    try {

        // Si el parámetro parece ser un nombre de ciudad, buscar actividades por ciudad
        
        const activities = await getActivities();

        const cityActivities = activities.filter(actividad => actividad.ciudad.toLowerCase() === query.toLowerCase());

        if (cityActivities.length > 0) {
            res.status(200).json(cityActivities);
            return 
        }

        const formattedName = query.toLowerCase();

        const city = await Activity.findOne({ nombre: { $regex: new RegExp('^' + formattedName, 'i') } });
        
        return city;
    } catch (error) {
        throw error;
    }
}

export { getActivities, getActivityLocation, sortByPriceAsc, sortByPriceDesc, dobleFiltro, updateActividad, deleteActividad, getActivityById, paginacion, getActivityByName, createActivity }