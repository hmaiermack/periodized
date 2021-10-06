import { NextFunction, Request, Response } from 'express'

import asyncHandler from 'express-async-handler'
import { ProgramModel } from '../models/Program.model'
import { User } from '../models/User.model'
import { createProgram } from '../services/programServices/createProgram.service'
import { editProgram } from '../services/programServices/editProgram.service'

const createProgramController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.currentUser.uid
    const user = await User.findById(userId)
    const { name } = req.body

    const program = await createProgram({
        user: userId,
        name
    })

    if(program){
        //if user doesn't have a current program
        //set currentProgram to the program just created
        if(!user?.currentProgram) {
            try {

                
                await User.updateOne(
                    { _id: userId}, 
                    { 
                        currentProgram: program
                    })
                res.status(200).json({
                    programId: program._id,
                    programName: program.name
                })
            } catch (error) {
                res.status(500).json({
                    message: 'Couldnt not set program as current'
                })
            }
        } else {
            
            res.status(200).json({
                programId: program._id,
                programName: program.name
            })
        }

    } else {
        res.status(500).json({
            message: 'Something went wrong creating your program.'
        })
    }
})

const editProgramController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, duration, trainingBlocks } = req.body

    console.log('editing program')
    const program = await editProgram({
        id: req.params.id,
        name,
        duration, 
        trainingBlocks
    })

    console.log(program)

    if(program){
        console.log('program edited')
        res.status(200).json({
            program
        })
    } else {
        res.status(500).json({
            message: 'Something went wrong editing your program.'
        })
    }
})

const getProgramByIdController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    console.log(req.params.id)
    const program = await ProgramModel.findOne({_id: req.params.id})
    console.log(program)

    if(program){
        res.status(200).json({
            program
        })
    } else {
        res.status(404).json({
            message: 'Program not found.'
        })
    }
})

export {
    createProgramController,
    editProgramController,
    getProgramByIdController
}