import { UserType } from "../utils/types.util";

export interface CreateUserDTO {
    firstName?: string,
    lastName?: string,
    userType: UserType,
    email: string,
    password: string,
}