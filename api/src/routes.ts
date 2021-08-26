import { Express, Request, Response } from "express";
import express from 'express'
import { createUserController, deleteUserController } from "./controllers/userController";
import { createProgramController } from "./controllers/programController";

export function healthCheck (app: Express) {
    app.get('/health', (req: Request, res: Response) => {
        res.sendStatus(200)
    })
}

const userRouter = express.Router()

userRouter.route('/register').post(createUserController)
// userRouter.route('/get').get(getUserController)
userRouter.route('/delete').delete(deleteUserController)
userRouter.post('/login')

const programRouter = express.Router()

programRouter.route('/create').post(createProgramController)

export { userRouter, programRouter }