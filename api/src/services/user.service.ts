import { DocumentDefinition } from "mongoose";
import { User, UserClass } from "../models/User.model";


export async function createUser(userInfo: DocumentDefinition<UserClass>) {
    try {
        return await User.create(userInfo)
    } catch (e) {
        throw new Error(e)
    }
}