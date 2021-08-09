import mongoose from 'mongoose'
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { User } from '../models/User.model'
import { createUser, getUser } from '../services/user.service'

const createUserController = asyncHandler(async (req: Request, res: Response) => {

    const _id = req.currentUser.uid
    const username = req.body.username

    const userExists = await User.findOne({ _id })

    if(userExists) {
        res.status(400).json({
            message: 'User already exists'
        })
        throw new Error()
    }

    const user = await createUser({
        _id,
        username
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            message: "Account successfully created."
        })
    } else {
        res.status(400)
        throw new Error("Something went wrong")
    }
})

const getUserController = asyncHandler(async (req: Request, res: Response) => {
    const _id = req.currentUser.uid

    const user = await getUser({ _id })

    if(user){
        res.status(201).json({
            _id: user._id,
            username: user.username
        })
    } else {
        res.status(400).json({
            message: 'User not found'
        })
        throw new Error()
    }
})

export {
    createUserController,
    getUserController
}