import { DocumentDefinition } from "mongoose";
import { TrainingBlocksClass } from "../../models/TrainingBlocks.model";
import { ProgramModel, TrainingBlocksModel, User } from "../../models";
import { mongoose } from "@typegoose/typegoose";


export async function createTrainingBlock(tBlockInfo: DocumentDefinition<TrainingBlocksClass>) {
    const { name, user, program } = tBlockInfo

    const tBlocks = await TrainingBlocksModel.find({user, program})
    tBlocks.forEach(tBlock => {
        if(tBlock.name === name) {
            throw new Error("This program already has a training block with that name!")
        }
    })

    const trainingBlock = await TrainingBlocksModel.create({
        name,
        user,
        program
    })

    return trainingBlock
}