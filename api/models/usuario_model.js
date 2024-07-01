import mongoose from "mongoose"

// schema
const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        default: true
    },
    viajes: [
        {
            viajeId: mongoose.Schema.Types.ObjectId
        }
    ]
});

export default mongoose.model("users", usuarioSchema)
