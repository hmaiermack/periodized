import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { User } from '../models/User.model'
import { ProgramModel } from '../models/Program.model'

const createUser = asyncHandler(async (req: Request, res: Response) => {

    const _id = req.currentUser.uid

    console.log(_id)

    const userExists = await User.findOne({ _id })

    const programs = await ProgramModel.find({})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        _id,
        programsList: 1
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            programs: programs,
            message: "Account successfully created."
        })
    } else {
        res.status(400)
        throw new Error("Something went wrong")
    }
})

export {
    createUser,
}