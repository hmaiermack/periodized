import { FilterQuery } from "mongoose";
import { UserClass } from "../../models/User.model";
import { User } from "../../models";

export async function deleteUser(query: FilterQuery<UserClass>) {

    return await User.findOneAndDelete(query)

}