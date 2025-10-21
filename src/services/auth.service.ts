import {
  activateAccountDTO,
  GenerateAuthTokenDTO,
  LoginDTO,
  RegisterDTO,
} from "../dtos/auth.dto";
import {
  AppChannelEnum,
  LoginMethodEnum,
  UserTypeEnum,
  VerifyTypeEnum,
} from "../utils/enums.util";
import { IResult } from "../utils/interfaces.util";
import SystemService from "./system.service";
import jwt from "jsonwebtoken";

class AuthService {
  constructor() {}

  /**
   * @name validateRegister
   * @param data
   * @returns
   */
  public async validateRegister(data: RegisterDTO): Promise<IResult> {
    let result: IResult = { error: false, message: "", code: 200, data: null };
    const { email, password, userType, callbackUrl, verifyType } = data;

    const allowedType = ["code", "token"];
    const allowedUser: Array<string> = [
      UserTypeEnum.VENDOR,
      UserTypeEnum.CUSTOMER,
    ];

    if (!email) {
      result.error = true;
      result.code = 400;
      result.message = "Email is required";
    } else if (!password) {
      result.error = true;
      result.code = 400;
      result.message = "Password is required";
    } else if (!userType) {
      result.error = true;
      result.code = 400;
      result.message = "UserType is required";
    } else if (!allowedUser.includes(userType)) {
      result.error = true;
      result.code = 400;
      result.message = `invalid user type. choose from ${allowedUser.join(
        ","
      )}`;
    } else if (!allowedType) {
      result.error = true;
      result.code = 400;
      result.message = `verify type is required`;
    } else if (!allowedType.includes(verifyType)) {
      result.error = true;
      result.code = 400;
      result.message = `invalid verification type. choose from ${allowedType.join(
        ","
      )}`;
    } else if (!callbackUrl) {
      result.error = true;
      result.code = 400;
      result.message = `callback url is required`;
    } else {
      result.error = false;
      result.code = 200;
      result.message = "";
    }

    return result;
  }

  /**
   * @name validateAccountVerify
   * @param data
   * @returns
   */
  public async validateAccountVerify(
    data: activateAccountDTO
  ): Promise<IResult> {
    const allowedType = SystemService.enumToArray(
      VerifyTypeEnum,
      "values-only"
    );
    const { type, token, code } = data;
    let result: IResult = { error: false, message: "", code: 200, data: null };
    if (!type) {
      result.error = true;
      result.code = 400;
      result.message = "Activation type is required";
    } else if (!allowedType.includes(type)) {
      result.error = true;
      result.code = 400;
      result.message = `Invalid activation type. choose from ${allowedType.join(
        ","
      )}`;
    } else if (type === VerifyTypeEnum.TOKEN && !token) {
      result.error = true;
      result.code = 400;
      result.message = "Token is required";
    } else if (type === VerifyTypeEnum.CODE && !code) {
      result.error = true;
      result.code = 400;
      result.message = "Code is required";
    } else {
      result.error = false;
      result.code = 200;
      result.message = "";
    }

    return result;
  }

  /**
   * @name validateLogin
   * @param data
   * @returns
   */
  public async validateLogin(
    data: LoginDTO,
    channel: string
  ): Promise<IResult> {
    let result: IResult = { error: false, message: "", code: 200, data: null };

    const allowedMethod = SystemService.enumToArray(
      LoginMethodEnum,
      "values-only"
    );
    const { email, password, method, hash } = data;

    if (!email) {
      result.error = true;
      result.code = 400;
      result.message = "Email is required";
    } else if (!password) {
      result.error = true;
      result.code = 400;
      result.message = "Password is required";
    } else if (!method) {
      result.error = true;
      result.code = 400;
      result.message = "login method is required";
    } else if (!allowedMethod.includes(method)) {
      result.error = true;
      result.code = 400;
      result.message = `invalid user type. choose from ${allowedMethod.join(",")}`;
    } else {
      if (
        method == LoginMethodEnum.BIOMETRIC &&
        channel !== AppChannelEnum.MOBILE
      ) {
        result.error = true;
        result.code = 400;
        result.message = `invalid login method for a ${channel} device`;
      }else if (
        method == LoginMethodEnum.BIOMETRIC &&
        !hash
      ) {
        result.error = true;
        result.code = 400;
        result.message = `encrypted hash is required`;
      } else {
        result.error = false;
        result.code = 200;
        result.message = "";
      }
    }

    return result;
  }

  /**
   * @name generateAuthToken
   * @param data
   * @returns
   */
  public async generateAuthToken(data: GenerateAuthTokenDTO): Promise<string> {
    const secret = process.env.JWT_SECRET || "";
    const expires = 60 * 60 * parseInt(process.env.JWT_EXPIRE || "");
    // const secret = process.env.JWT_SECRET || "";

    const signed = jwt.sign(data, secret, {
      expiresIn: expires,
    });

    return signed;
  }
}

export default new AuthService();
