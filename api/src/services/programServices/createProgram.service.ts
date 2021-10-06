import { DocumentDefinition } from "mongoose";
import { ProgramModel, ProgramClass } from "../../models/Program.model";

export async function createProgram(programInfo: DocumentDefinition<ProgramClass>) {

    const {user, name} = programInfo

    return await ProgramModel.create({
        user,
        name
    })

}