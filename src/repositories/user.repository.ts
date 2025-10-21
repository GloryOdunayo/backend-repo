import { FilterQuery, ObjectId } from "mongoose";
import { IUserDoc } from "../utils/interfaces.util";
import User from "../models/User.model";

class UserRepository {
    constructor(){}

    /**
     * @name findById
     * @param id 
     * @param populate 
     * @returns 
     */
    public async findById(id: ObjectId, populate: boolean = false): Promise<IUserDoc | null> {
        const datapop = [
            { path: 'roles', select: "_id name" }
        ]

        const pop = populate ? datapop : []

        const query: FilterQuery<IUserDoc> = {_id: id};

        const user = await User.findOne(query).populate(pop);

        return user
    }

    /**
     * @name findByEmailSelectPassword
     * @param email 
     * @param populate 
     * @returns 
     */
    public async findByEmailSelectPassword(email: string, populate: boolean = false): Promise<IUserDoc | null> {
        const datapop = [
            { path: 'roles', select: "_id name" }
        ]

        const pop = populate ? datapop : []

        const query: FilterQuery<IUserDoc> = {email: email};

        const user = await User.findOne(query).populate(pop).select("+password");

        return user
    }
}

export default new UserRepository();