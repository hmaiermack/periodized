import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { ProgramModel, TrainingBlocksModel, User } from '../models'
import { TrainingBlocksClass } from '../models/TrainingBlocks.model'
import { createTrainingBlock } from '../services/trainingBlockServices/createTrainingBlock.service'


const createTrainingBlockController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.currentUser.uid
    const { name, programId } = req.body

    console.log(name)

    if (!name) {
        res.status(400).json(
            {
                message: "Your training block needs to have a name!"
            }
        )
        throw new Error("No name for training block.")
    } else if (!programId) {
        res.status(400).json({
            message: "Your training block needs to be assigned to a program."
        })
        throw new Error("No program associated with training block.")
    }

    const trainingBlock = await createTrainingBlock({
        user: userId,
        name,
        program: programId
    })


    res.status(200).json({
        id: trainingBlock?._id,
        name: trainingBlock?.name
    })

})

const getAllTrainingBlocksForProgramController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.currentUser.uid
    const program = req.body.programId

    const trainingBlocks = await TrainingBlocksModel.find({
        user: userId,
        program
    })

    const red = trainingBlocks.map(item => {
       const rObj = {
           id: item._id,
           name: item.name
       }
       return rObj
    })


    res.status(200).json({
        red
    })

})

export { createTrainingBlockController, getAllTrainingBlocksForProgramController }