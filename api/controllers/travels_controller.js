import mongoose from 'mongoose';
import Travels from '../models/travels_model.js'


export const getUserTravels = async (req, res) => {
    const {userId} = req.params;
    // console.log(userId);
    try {
        
        const id = new mongoose.Types.ObjectId(userId)
        
        const userTravels = await Travels.find({ "dueño.user_id": id});
        res.json(userTravels);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createNewTravel = async (req, res) => {

    const body = req.body

    const travel = new Travels({
        nombre: body.nombre,
        destino: body.destino,
        dueño: {
            user_id: body.dueño.id,
            userNombre: body.dueño.nombre
        },
        inicio_viaje: body.inicio_viaje,
        final_viaje: body.final_viaje || null,
    });

    try {
        const newTravel = await travel.save();
        res.status(201).json(newTravel);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

export const travelById = async (req, res) => {
    const {id} = req.params

    try {
        const travel = await Travels.findById(id);
        res.json(travel);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateTravel = async (req, res) => {
    const {id} = req.params
    const body = req.body

    try {
        const travel = await Travels.updateOne({_id: id}, {
            $set: {
                nombre: body.nombre,
                destino: body.destino
            }
        })
        res.status(201).json(travel)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const storageTravel = async (req, res) => {
    const {id} = req.params
    const { estado } = req.body
    try {
        const travel = await Travels.updateOne({_id: id}, {
            $set: {
                estado: estado
            }
        })
        res.status(201).json(travel)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// ACTUALIZACIÓN DE GASTO

export const getSpend = async (req, res) => {
    const { id } = req.params;

    try {

        const travels = await Travels.find({});

        const travel = await Travels.findOne({ "gastos._id": id }, { "gastos.$": 1 });

        if (!travel || !travel.gastos.length) {
            return res.status(404).json({ message: 'Gasto no encontrado' });
        }
        res.status(200).json(travel.gastos[0]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const updateSpend = async (req, res) => {
    const {id} = req.params
    const body = req.body

    try {
        const travel = await Travels.updateOne({ _id: id }, {
            $push: {
                gastos: {
                    nombre: body.nombre,
                    valor: body.valor,
                    fecha: body.fecha
                }
            }
        })
        res.status(201).json(travel);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteSpend = async (req, res) => {
    const {id} = req.params

    try {
        const result = await Travels.updateOne(
            { "gastos._id": id },
            { $pull: { gastos: { _id: id } } }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ message: 'Gasto no encontrado' });
        }

        res.status(200).json({ message: 'Gasto eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const modifySpend = async (req, res) => {
    const {id} = req.params

    const { nombre, valor } = req.body;

    try {
        const result = await Travels.updateOne(
            { "gastos._id": id },
            {
                $set: {
                    "gastos.$.nombre": nombre,
                    "gastos.$.valor": valor
                }
            }
        );
        if (result.nModified === 0) {
            return res.status(404).json({ message: 'Gasto no encontrado' });
        }


        res.status(200).json({ message: 'Gasto actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// CONTROLLERS DE EVENTOS

export const updateEvents = async (req, res) => {
    const {id} = req.params;
    const body = req.body

    try {
        const fechaEvento = new Date(body.eventos.fecha);
        const travel = await Travels.updateOne({_id: id}, {
            $push: {
                eventos: {
                    nombre: body.eventos.nombre,
                    descripcion: body.eventos.descripcion,
                    fecha: fechaEvento,
                    horario: body.eventos.horario
                }
            }
        })
        res.status(201).json(travel)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}
