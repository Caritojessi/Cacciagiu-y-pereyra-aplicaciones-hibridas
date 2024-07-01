import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    informacion: {
        type: String,
        required: true
    },
    actividades: {
        type: Array,
        required: false
    },
    image: {
        type: String, 
        required: false 
    }


})



export default mongoose.model("city", locationSchema)