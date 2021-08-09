import { mongoose } from "@typegoose/typegoose";
import { DocumentDefinition, FilterQuery } from "mongoose";
import { User, UserClass } from "../models/User.model";


export async function createUser(userInfo: DocumentDefinition<UserClass>) {
    
    const { _id, username } = userInfo
    
    return await User.create({
        _id,
        username
    })

}

export async function getUser(query: FilterQuery<UserClass>) {
    return User.findOne(query)
}

export async function deleteUser(query: FilterQuery<UserClass>) {

    return await User.findOneAndDelete(query)

}