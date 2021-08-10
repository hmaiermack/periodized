import { DocumentDefinition } from "mongoose";
import { User, UserClass } from "../../models/User.model";


export async function createUser(userInfo: DocumentDefinition<UserClass>) {
    
    const { _id, username } = userInfo
    
    return await User.create({
        _id,
        username
    })
}
