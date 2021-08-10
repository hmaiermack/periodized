import { FilterQuery } from "mongoose";
import { User, UserClass } from "../../models/User.model";

export async function deleteUser(query: FilterQuery<UserClass>) {

    return await User.findOneAndDelete(query)

}