import jwt from "jsonwebtoken"
import "dotenv/config"

let verificarToken = (req, res, next) =>{
    let token= req.get('auth');
    
    jwt.verify (token, process.env.SEED, (error, decoded) =>{
    if(error){
        res.status(400).json (error)
    }
    req.user = decoded.user;
    next()
    })
}

export default verificarToken;
