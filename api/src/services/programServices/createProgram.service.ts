import { DocumentDefinition } from "mongoose";
import { ProgramModel, ProgramClass } from "../../models/Program.model";

export async function createProgram(programInfo: DocumentDefinition<ProgramClass>) {

    const {user, name, startDate, duration} = programInfo

    return await ProgramModel.create({
        user,
        name,
        startDate,
        duration
    })

}