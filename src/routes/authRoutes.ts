import express, {Router, Request, Response} from 'express';
import jwt from 'jsonwebtoken'

const router: Router = Router()

//1. Definir las rutas
router.get(
    '/login',
    (req: Request, res: Response)=>{

        const payload={
            id:"user_id",
            username:"Maidy"
        }

        const option={
            expiresIn: "24h"
        }

        const secretKey= process.env.SECRET_KEY

        if(typeof secretKey == 'string'){
            const token= jwt.sign(payload, secretKey, option)
            res.json({token})
        }
    }
)

router.get(
    '/despedida',
    (req: Request, res: Response)=>{
        res.send('Hasta luego')
    }
)

export default router
