import mongoose from 'mongoose'
import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import asyncHandler from 'express-async-handler'
import { User } from '../models/User.model'
import { createUser, deleteUser } from '../services/userServices/index'
import admin from 'firebase-admin'
import { ProgramModel } from '../models/Program.model'


const createUserController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const { username, email, password } = req.body


    const usernameExists = await User.findOne({ username })
    console.log('username exists', usernameExists)
    if(usernameExists) {
        console.log('backend user exists')
        res.status(400).json({
            message: 'Username is taken.'
        })
        throw new Error('Username already in use.')
    }
    

    console.log('awaiting firebase create')
    const firebaseUser = await admin.auth().createUser({
        email: email,
        password: password
    })

    console.log('firebase user', firebaseUser)

    if(firebaseUser) {
        console.log('firebase success awaiting user create')
        const user = await createUser({
            _id: firebaseUser.uid,
            username
        })
    
        if(user){
            console.log('user success, send response')
            res.status(201).json({
                _id: user._id
            })
        } else {
            console.log('user fail')
            console.log('awaiting firebase user delete')
            await admin.auth().deleteUser(firebaseUser.uid)
            res.status(400)
        }        
    }

})

const getUserByIdController = asyncHandler(async (req: Request, res: Response) => {
    const _id = req.currentUser.uid

    const user = await User.findById(_id)
    const programList = await ProgramModel.find({
        user: _id
    }, '_id name')
    if(user){
        res.status(201).json({
            _id: user._id,
            username: user.username,
            currentProgram: user.currentProgram,
            programs: programList
        })
    } else {
        res.status(400).json({
            message: 'User not found'
        })
        throw new Error()
    }
})

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
    deleteUserController,
    getUserByIdController
}