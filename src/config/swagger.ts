import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerUiOptions } from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
	swaggerDefinition: {
		openapi: '3.0.2',
		tags: [
			{
				name: 'Products',
				description: 'API operations related to products'
			}
		],
		info: {
			title: 'REST API Node.js / Express / TypeScript',
			version: '1.0.0',
			description: 'API Docs for Products'
		}
	},
	apis: ['./src/router.ts']
};

export const swaggerUiOptions: SwaggerUiOptions = {
	customCss: `
		.swagger-ui .topbar a {
			max-width: 40px;
		}
		.topbar-wrapper .link {
			content: url('https://imgs.search.brave.com/PBObDQhElLLghbtGfzIbbeZ_G5wGbf2rCuVZ7CMUum4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aGFzaG5vZGUuY29t/L3Jlcy9oYXNobm9k/ZS9pbWFnZS91cGxv/YWQvdjE2NDc0OTA2/MTk5NjUvUDFkc05n/ai1mMS5wbmc');
		}
	`,
	customSiteTitle: 'Documentación REST API EXPRESS / TypeScript'
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
