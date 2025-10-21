import { ObjectId } from "mongoose";
import { LoginMethodType } from "../utils/types.util";

export interface RegisterDTO {
    email: string,
    password: string,
    userType: string,
    callbackUrl: string,
    verifyType: string,
}

export interface activateAccountDTO {
    type: string,
    token: string,
    code: string,
}

export interface LoginDTO {
    email: string,
    password: string,
    method: LoginMethodType,
    hash?: string;
}

export interface GenerateAuthTokenDTO {
    id: ObjectId,
    email: string,
    roles: Array<ObjectId>,
    role?: Array<ObjectId>,
}


// DTO for mappers
export interface MapLoginResponseDTO {
    _id: ObjectId,
    id: ObjectId,
    email: string,
    userType: string,
    isSuper: boolean,
    isAdmin: boolean,
    isVendor: boolean,
    isCustomer: boolean,
    isStaff: boolean,
    isGuest: boolean,
    isUser: boolean,
    roles: Array<string >
}