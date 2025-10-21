import { CreateUserDTO } from "../dtos/user.dto";
import Role from "../models/Role.model";
import User from "../models/User.model";
import { UserTypeEnum } from "../utils/enums.util";
import { IUserDoc } from "../utils/interfaces.util";
import { UserType } from "../utils/types.util";
import RandomService from "./random.service";

class UserService {

    constructor(){}

    /**
     * @name userExist
     * @param email
     * @returns {Promise<boolean>} boolean
     */
    public async userExist(email: string): Promise<boolean>{
        const exUser = await User.findOne({email: email});

        return exUser? true : false;
    }


    /**
     * @name checkEmail
     * @param email
     * @returns {Promise<boolean>} boolean
     */
    public async checkEmail(email: string): Promise<boolean>{
        const match: RegExp = /^\w+([\.-]?\w+)*@\w=([\.-]?\w+)*(\.\w{2,3})+$/;
        const isMatched = match.test(email)

        return isMatched
    }

    /**
     * @name checkPassword
     * @param password
     * @returns {Promise<boolean>} boolean
     */
    public async checkPassword(password: string): Promise<boolean>{
        const match: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
        const isMatched = match.test(password)

        return isMatched
    }

    /**
     * @name createUser
     * @description create new user on the platform
     * @param {CreateUserDTO} data see CreateUserDTO
     * @returns
     */
    public async createUser(data: CreateUserDTO) : Promise<IUserDoc> {
        const { email, password, firstName, lastName, userType } = data;

        const exUser = await User.findOne({ email: email });
        
        if(exUser) {
            console.log(exUser, 'user found', email)
            return exUser;
        } else {
            let user: IUserDoc = await User.create({
                email: email,
                password: password,
                userType: userType,
                firstName: firstName,
                lastName: lastName,
                isActive: true,
            }) 

            // attach user role
            user = await this.attachRole(user, userType)

            return user;
        }
    }


    /**
     * @name attachRole
     * @description attach role to new user on the platform
     * @param {UserType} user, userType see UserType
     * @returns
     */
    public async attachRole(user: IUserDoc, userType: UserType) : Promise<IUserDoc> {
        const userRole = await Role.findOne ({ name: 'user' })
        const typeRole = await Role.findOne ({ name: userType })

        if( userRole && typeRole ){
            user.roles.push(userRole._id)
            user.roles.push(typeRole._id)
            user.isUser = true;
            if(userType == UserTypeEnum.ADMIN){
                user.isAdmin = true;
            }
            if(userType == UserTypeEnum.VENDOR){
                user.isVendor = true;
            }
            if(userType == UserTypeEnum.CUSTOMER){
                user.isCustomer = true;
            }
            if(userType == UserTypeEnum.STAFF){
                user.isStaff = true;
            }
            if(userType == UserTypeEnum.GUEST){
                user.isGuest = true;
            }

            // update
            await user.save()
        }

        return user
    }

    /**
     * @name generateOTP
     * @param id 
     * @returns
     */
    public async generateOTP(id: Object): Promise<string>{
        const user = await User.findOne({_id: id});
        let otp: string = '000000';

        if(user){
            otp = RandomService.randomNum(6);
            user.emailCode = otp;
            user.emailCodeExpire = Date.now() + 10 * 60 * 1000;

            await user.save();
        }

        return otp;
    }
}

export default new UserService();