import request from 'supertest';
import server, { connectDB } from '../server';
import db from '../config/db';

describe('GET /api', () => {
	it('should send back a json response', async () => {
		const res = await request(server).get('/api');
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Desde API');
		expect(res.headers['content-type']).toMatch(/json/);

		expect(res.status).not.toBe(404);
		expect(res.body.msg).not.toBe('desde API');
	});
});

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
