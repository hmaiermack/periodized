import mongoose from 'mongoose'
import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import asyncHandler from 'express-async-handler'
import { User } from '../models/User.model'
import { createUser, deleteUser, getUserById } from '../services/userServices/index'

const createUserController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const _id = req.body.uid
    const username = req.body.username

    const usernameExists = await User.findOne({ username })

    if(usernameExists) {
        res.status(400).json({
            error: 'Username is taken.'
        })
        const error = new Error('Username is already in use.')
        next(error)
    }

    const user = await createUser({
        _id,
        username
    })

    if(user){
        res.status(201).json({
            _id: user._id
        })
    } else {
        res.status(400)
        const error =  new Error("Error on creating new User document")
        next(error)
    }
})

// const getUserByIdController = asyncHandler(async (req: Request, res: Response) => {
//     const _id = req.currentUser.uid

//     const user = await getUserById({ _id })

//     if(user){
//         res.status(201).json({
//             _id: user._id,
//             username: user.username
//         })
//     } else {
//         res.status(400).json({
//             message: 'User not found'
//         })
//         throw new Error()
//     }
// })

const deleteUserController = asyncHandler(async (req: Request, res: Response) => {
    const _id = req.currentUser.uid

    const deleted = await deleteUser({ _id })

    if(deleted) {
        res.status(201).json({
            deleted: deleted,
            message: 'Account deleted.'
        })
    } else {
        res.status(400).json({
            message: 'Something went wrong'
        })
        throw new Error()
    }
})

export {
    createUserController,
    deleteUserController
}