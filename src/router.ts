import { Router } from 'express';
import { body, param } from 'express-validator';
import {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	updateAvailability,
	deleteProduct
} from './handlers/product';
import { handleInputErrors } from './middleware';

const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *      description: The Product ID
 *      example: 1
 *     name:
 *      type: string
 *      description: The Product name
 *      example: Monitor Curvo de 49 pulgadas
 *     price:
 *      type: number
 *      description: The Product price
 *      example: 1000
 *     availability:
 *      type: boolean
 *      description: The Product availability
 *      example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *   summary: Get a list of products
 *   tags:
 *    - Products
 *   description: Return a list of products
 *   responses:
 *    200:
 *     description: Successful response
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Product'
 *
 *
 */

router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *   summary: Get a product by ID
 *   tags:
 *    - Products
 *   description: Return a product based on its unique ID
 *   parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: Successful response
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Product'
 *    400:
 *     description: Bad request
 *    404:
 *     description: Not found
 */

router.get(
	'/:id',
	param('id').isInt().withMessage('ID no válido.'),
	handleInputErrors,
	getProductById
);

/**
 * @swagger
 * /api/products:
 *  post:
 *   summary: Creates a new product
 *   tags:
 *    - Products
 *   description: Return a new record in the database
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *         example: "Samsung S9"
 *        price:
 *         type: number
 *         example: 499
 *   responses:
 *    201:
 *     description: Successful response
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Product'
 *    400:
 *     description: Bad request - Invalid input data
 */

router.post(
	'/',
	// Validación
	body('name')
		.notEmpty()
		.withMessage('El nombre del producto no puede ir vacío.'),
	body('price')
		.notEmpty()
		.withMessage('El precio del producto no puede ir vacío.')
		.isNumeric()
		.withMessage('El precio del producto debe ser un número.')
		.custom(value => value > 0)
		.withMessage('El precio del producto debe ser mayor a cero.'),
	handleInputErrors,
	createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *   summary: Updates a product with user input
 *   tags:
 *    - Products
 *   description: Returns the updated product
 *   parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *       type: integer
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *         example: "Samsung S9"
 *        price:
 *         type: number
 *         example: 499
 *        availability:
 *         type: boolean
 *         example: false
 *   responses:
 *    200:
 *     description: Successful response
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Product'
 *    400:
 *     description: Bad request - Invalid ID or invalid input data
 *    404:
 *     description: Product not found
 */

router.put(
	'/:id',
	param('id').isInt().withMessage('ID no válido.'),
	body('name')
		.notEmpty()
		.withMessage('El nombre del producto no puede ir vacío.'),
	body('price')
		.notEmpty()
		.withMessage('El precio del producto no puede ir vacío.')
		.isNumeric()
		.withMessage('El precio del producto debe ser un número.')
		.custom(value => value > 0)
		.withMessage('El precio del producto debe ser mayor que cero.'),
	body('availability')
		.isBoolean()
		.withMessage('Valor para disponibilidad no válido.'),
	handleInputErrors,
	updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *   summary: Update product availability
 *   tags: 
 *    - Products 
 *   description: Returns the updated availability
 *   parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: Successful response
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Product'
 *    400:
 *     description: Bad request - Invalid ID
 *    404:
 *     description: Product not found
 */

router.patch(
	'/:id',
	param('id').isInt().withMessage('ID no válido.'),
	handleInputErrors,
	updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *   summary: Delete a product by a given ID
 *   tags: 
 *    - Products 
 *   description: Returns a confirmation message
 *   parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to delete
 *      required: true
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: Successful response
 *     content:
 *      application/json:
 *       schema:
 *        type: string
 *        value: 'Producto eliminado.'
 *    400:
 *     description: Bad request - Invalid ID
 *    404:
 *     description: Product not found
 */

router.delete(
	'/:id',
	param('id').isInt().withMessage('ID no válido.'),
	handleInputErrors,
	deleteProduct
);

export default router;
