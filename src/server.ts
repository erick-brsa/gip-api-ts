import express from 'express';
import colors from 'colors';
import swaggerUi from 'swagger-ui-express';

import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import router from './router';
import db from './config/db';

// Conectar a BD
export async function connectDB() {
	try {
		await db.authenticate();
		db.sync();
		// console.log(colors.blue('Conexión exitosa a la base de datos'));
	} catch (error) {
		console.log(colors.red.bold('Hubo un error al conectarse a la BD'));
	}
}

connectDB();

// Instancia de express
const server = express();

// Leer datos de formulario
server.use(express.json());
server.use('/api/products', router);

// Documentación
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default server;
