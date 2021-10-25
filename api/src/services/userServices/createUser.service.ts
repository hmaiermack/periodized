import { DocumentDefinition } from "mongoose";
import { UserClass } from "../../models/User.model";
import { User } from "../../models";


export async function createUser(userInfo: DocumentDefinition<UserClass>) {
    
    const { _id, username } = userInfo
    
    return await User.create({
        _id,
        username
    })
}
