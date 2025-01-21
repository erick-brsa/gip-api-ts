import { connectDB } from '../server';
import db from '../config/db';

jest.mock('../config/db');

describe('connectDB', () => {
	it('should handle database connection error', async () => {
		// Se simula la conexión a la base de datos
		// Espera a que se ejecute "await db.authenticate()"
		jest.spyOn(db, 'authenticate').mockRejectedValueOnce(
			new Error('Hubo un error al conectarse a la BD')
		);
		const consoleSpy = jest.spyOn(console, 'log');
		await connectDB();
		expect(consoleSpy).toHaveBeenCalledWith(
			expect.stringContaining('Hubo un error al conectarse a la BD')
		);
	});
});
