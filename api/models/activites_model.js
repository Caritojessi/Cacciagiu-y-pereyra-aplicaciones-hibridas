import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    ciudad: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: false
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
    },
    image: {
        type: String,
        required: false
    }
})

export default mongoose.model("activities", activitySchema)