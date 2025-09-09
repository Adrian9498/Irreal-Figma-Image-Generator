import express from 'express';
//import conexion from './config/database.js'
import routes from './router/routes.js';
import cors from 'cors';
const app = express()

async function iniciarServidor(){

    app.use(cors());
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(routes)
    app.listen(3000)

    console.log("Servidor escuchando en puerto 3000")
}

iniciarServidor()