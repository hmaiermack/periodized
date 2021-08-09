import { Express, Request, Response } from "express";
import express from 'express'
import { createUserController, getUserController } from "./controllers/userController";

export function healthCheck (app: Express) {
    app.get('/health', (req: Request, res: Response) => {
        res.sendStatus(200)
    })
}

const userRouter = express.Router()

userRouter.route('/register').post(createUserController)
userRouter.route('/get').get(getUserController)
userRouter.post('/login')

export { userRouter }