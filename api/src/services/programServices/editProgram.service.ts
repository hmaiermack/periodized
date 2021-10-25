import { mongoose } from "@typegoose/typegoose";
import { Document } from "mongoose";
import {  ProgramClass } from "../../models/Program.model";
import { ProgramModel } from "../../models"

interface IProgramInfo {
    id: string,
    name?: string,
    duration?: number,
    trainingBlocks?: mongoose.Types.ObjectId[]
}

export async function editProgram(programInfo: IProgramInfo) {

    const program = await ProgramModel.findById(programInfo.id)

    if(program) {
        program.name = programInfo.name || program.name
        program.duration = programInfo.duration || program.duration
        program.trainingBlocks = programInfo.trainingBlocks || program.trainingBlocks
    } else {
        throw new Error('Program not found.')
    }

    return await program?.save()
}