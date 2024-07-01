import mongoose from "mongoose";

const TravelSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    destino: {
        type: String,
        required: true
    },
    dueño: {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        userNombre: {
            type: String,
            required: true
        }
    },
    gastos:  [
        {
            nombre: {
                type: String,
                required: false
            },
            valor: {
                type: Number,
                required: false
            }
        }
    ],
    eventos:  [
        {
            nombre: {
                type: String,
                required: true
            },
            descripcion: {
                type: String,
                required: false
            },
            fecha: {
                type: Date,
                required: true
            },
            horario: {
                type: String,
                required: true
            }
        }
    ]
});


export default mongoose.model('travels', TravelSchema)