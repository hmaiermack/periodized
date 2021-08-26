import { NextFunction, Request, Response } from 'express'

import asyncHandler from 'express-async-handler'
import { createProgram } from '../services/programServices/createProgram.service'
import { editProgram } from '../services/programServices/editProgram.service'

const createProgramController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.currentUser.uid
    const { name, startDate, duration } = req.body

    console.log('creating program')
    const program = await createProgram({
        user: userId,
        name,
        startDate,
        duration
    })

    console.log(program)

    if(program){
        console.log('program created')
        res.status(200).json({
            programId: program._id,
            programName: program.name,
            programStartDate: program.startDate,
            programEndDate: program.endDate,
            duration: program.duration
        })
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
            programId: program._id,
            programName: program.name,
            programStartDate: program.startDate,
            programEndDate: program.endDate,
            duration: program.duration
        })
    } else {
        res.status(500).json({
            message: 'Something went wrong creating your program.'
        })
    }
})

export {
    createProgramController,
    editProgramController
}