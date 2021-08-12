import { QueryOptions } from "mongoose";
import { User, UserClass } from "../../models/User.model";

export async function getUserById(_id: UserClass["_id"], options: QueryOptions = { lean: true }) {

    const user = await User.findById(_id, null, options)

    if(user) {
        return user
    } else {
        throw new Error('User not found.')
    }
}
