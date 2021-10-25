import { DocumentDefinition } from "mongoose";
import { ProgramClass } from "../../models/Program.model";
import { ProgramModel } from "../../models";

export async function createProgram(programInfo: DocumentDefinition<ProgramClass>) {

    const {user, name} = programInfo

    return await ProgramModel.create({
        user,
        name
    })

}