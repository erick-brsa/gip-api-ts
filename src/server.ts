import express from 'express';
import router from './router';
import db from './config/db';

// Conectar a BD
async function connectDB() {
	try {
        await db.authenticate();
        db.sync();
        console.log("Conexión exitosa a la base de datos");
        
	} catch (error) {
		console.log(error);
		console.log('Hubo un error al conectarse a la BD');
	}
}

const server = express();

server.use('/', router);

export default server;
