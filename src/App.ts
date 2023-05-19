import express, { Application, Request, Response, NextFunction } from 'express'
import swaggerUI from 'swagger-ui-express'
import { swaggerSpec } from './swagger.conf'
import cors from 'cors'
import passport from 'passport'
import dotenv from 'dotenv'
dotenv.config()

import PacienteRouter from './routes/Paciente.routes'
import MedicoRouter from './routes/Medico.routes'
import CitaRoutes from './routes/Cita.routes'
import EspecialidadRoutes from './routes/Especialidad.routes'
import FormularioRoutes from './routes/Formulario.routes'
import rutas_auth from './routes/authRoutes'
import miEstrategia from './config/passport'


/**
 * Clase principal de la API. Define las rutas de la API
 * 
 * @description Clase principal de la API. Define las rutas de la API
 */
class App {
    public app: Application
    private server: any

    constructor() {
        this.app = express()
        this.app.use(express.json())
        this.app.use(
            '/api-docs',
            swaggerUI.serve,
            swaggerUI.setup(swaggerSpec)
        )
        this.app.use(cors())
        this.app.use('/auth', rutas_auth)
        this.routes()
    }

    private routes(): void {
		passport.use(miEstrategia)
		this.app.use(passport.initialize())
		this.app.use('/', passport.authenticate('jwt', { session: false }), PacienteRouter, MedicoRouter, CitaRoutes, EspecialidadRoutes)
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			res.status(404).json({ message: 'Upss!! Lo que pidió no existe!!' })
		})
	}
	

    public start(): void {
        this.server = this.app.listen(3000, () => {
            console.log('El servidor está escuchando en el puerto 3000')
        })
    }

    public close(): void {
        this.server.close()
    }
}

export default App
