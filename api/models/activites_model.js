import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    informacion_general: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    estrellas: {
        type: Number,
        required: true
    }
})

export default mongoose.model("activities", activitySchema)