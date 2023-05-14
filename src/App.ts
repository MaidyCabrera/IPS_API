import express, { Application, Request, Response } from 'express'
import swaggerUI from 'swagger-ui-express'
import { swaggerSpec } from './swagger.conf'

import PacienteRouter from './routes/Paciente.routes'
import MedicoRouter from './routes/Medico.routes'
import CitaRoutes from './routes/Cita.routes'
import EspecialidadRoutes from './routes/Especialidad.routes'

/**
 * Clase principal de la API. Define las rutas de la API
 * 
 * @author Maidy Cabrera
 * @description Clase inicial de ejemplo para inicializar las Routes
 */ 
class App {
	/**
	 * Definimos los atributos
	 */
	public app: any
	private server: any

	constructor() {
		this.app = express()
		this.app.use(express.json())
		this.app.use(
			'/api-docs',
			swaggerUI.serve,
			swaggerUI.setup(swaggerSpec)
		)
		this.routes()
	}

	/**
	 * Definimos y agregamos las rutas de la API con express
	 */
	private routes(): void {
		this.app.use('/', PacienteRouter)
		this.app.use('/', MedicoRouter)
		this.app.use('/', CitaRoutes)
		this.app.use('/', EspecialidadRoutes)
	}

	public start(): void {
		this.server = this.app.listen(3000,
			() => {
				console.log('El servidor está escuchando en el puerto 3000')
			})
	}

	public close(): void {
		this.server.close()
	}
}

export default App

