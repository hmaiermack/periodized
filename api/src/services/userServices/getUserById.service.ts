import { FilterQuery } from "mongoose";
import { User, UserClass } from "../../models/User.model";

export async function getUserById(query: FilterQuery<UserClass>) {
    return User.findOne(query)
}
