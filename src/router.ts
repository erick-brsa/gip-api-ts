import { Router } from 'express';
import { body } from 'express-validator'
import { createProduct } from './handlers/product';
import { handleInputErrors } from './middleware';

const router = Router();

router.get('/', (req, res) => {
	res.json('Desde GET');
});

router.post('/',
	// Validación
	body('name')
		.notEmpty().withMessage('El nombre del producto no puede ir vacío.'),
	body('price')
		.notEmpty().withMessage('El precio del producto no puede ir vacío.')
		.isNumeric().withMessage('Valor no válido.')
		.custom(value => value > 0).withMessage('Precio no válido.'),
		handleInputErrors,
	createProduct);

router.put('/', (req, res) => {
	res.json('Desde PUT');
});

router.patch('/', (req, res) => {
	res.json('Desde PATCH');
});

export default router;
