import { NextFunction, Request, Response } from "express";
import { activateAccountDTO, LoginDTO, MapLoginResponseDTO, RegisterDTO } from "../dtos/auth.dto";
import AuthService from "../services/auth.service";
import ErrorResponse from "../utils/error.util";
import { PASSWORD_REGEX_ERROR } from "../utils/constant.util";
import UserService from "../services/user.service";
import { EmailDriver, UserType } from "../utils/types.util";
import EmailService from "../services/email.service";
import SystemService from "../services/system.service";
import { LoginMethodEnum, VerifyTypeEnum } from "../utils/enums.util";
import User from "../models/User.model";
import UserRepository from "../repositories/user.repository";
import { ObjectId } from "mongoose";
import AuthMapper from "../mappers/auth.mapper";
import { addJob } from "../queues/jobs/jobs.job";
import { JobChannel, QueueChannel } from "../queues/channel.queue";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, userType, callbackUrl, verifyType } = <RegisterDTO>req.body;

  const validate = await AuthService.validateRegister(req.body);

  if (validate.error) {
    return next(
      new ErrorResponse(
        "Error",
        validate.code,
        [`${validate.message}`],
        validate.error
      )
    );
  }

  const isEmailMatch = await UserService.checkEmail;

  if (!isEmailMatch) {
    return next(new ErrorResponse("Error", 400, ["Invalid email address"]));
  }

  const isExist = await UserService.userExist(email);
  if (isExist) {
    return next(new ErrorResponse("Error", 422, ["Email already exist"]));
  }


  const isPassMatch = await UserService.checkPassword;

  if (!isPassMatch) {
    return next(
      new ErrorResponse("Error", 400, [
        `Invalid password. ${PASSWORD_REGEX_ERROR}`,
      ])
    );
  }

  const user = await UserService.createUser({
    email: email,
    password: password,
    userType: userType as UserType,
    firstName: `New ${userType}`,
    lastName: `User`,
  });

  if(verifyType === VerifyTypeEnum.TOKEN){

    // generate and hash token
    const { token, hash } = await user.getActivatedToken();
    user.activationToken = hash;
    user.activationTokenExpire = Date.now() + 10 * 60 * 1000; //10 mins
    await user.save();
  
    // send verification email
    await EmailService.sendTokenVerifyEmail({
      driver: (process.env.EMAIL_DRIVER || "zepto") as EmailDriver,
      email: user.email,
      template: "verify_token",
      title: "Verify Your Email",
      fromName: "Glory from GeeLux",
      preheader: "confirm your email address",
      options: {
        salute: `Champ`,
        buttonText: "Verify Email",
        buttonUrl: `${callbackUrl}/${token}`,
      },
    });
  }

  if(verifyType === VerifyTypeEnum.CODE){
    // generate and save code
    const otp = await UserService.generateOTP(user._id);
  
    // send verification email
    await EmailService.sendOTPVerifyEmail({
      driver: (process.env.EMAIL_DRIVER || "zepto") as EmailDriver,
      email: user.email,
      template: "verify_otp",
      title: "Verify Your Email",
      fromName: "Glory from GeeLux",
      preheader: "confirm your email address",
      options: {
        salute: `Champ`,
        code: otp,
      },
    });
  }

  res.status(200).json({
    error: false,
    errors: [],
    data: {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
    },
    message: "successful",
    status: 200,
  });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const {email, password, method, hash} = <LoginDTO>req.body

  const validate = await AuthService.validateLogin(req.body, req.channel!);

  if (validate.error) {
    return next(
      new ErrorResponse(
        "Error",
        validate.code,
        [`${validate.message}`],
        validate.error
      )
    );
  }

  const user = await UserRepository.findByEmailSelectPassword(email);

  if(!user){
    return next(
      new ErrorResponse(
        "Error",
        404,
        [`incorrect login credentials`],
        validate.error
      )
    );
  }

  if(!user.isActive){
    return next(
      new ErrorResponse(
        "Error",
        403,
        [`inactive user account`],
        validate.error
      )
    );
  }

  if(user.isLocked){
    addJob({
      jobName: JobChannel.UnlockUsers,
      queueName: QueueChannel.UnlockUsers,
      data: { },
    })
    return next(
      new ErrorResponse(
        "Error",
        403,
        [`account currently locked`],
        validate.error
      )
    );
  }

  
  if(!user.isSuper){
    if(method === LoginMethodEnum.EMAIL){
      const isMatched = await user.matchPassword(password);
      if(!isMatched){
        if(user.login.limit >=3){
          if(!user.isLocked){
            user.isLocked = true;
            await user.save();
          }
          return next(
            new ErrorResponse(
              "Error",
              403,
              [`account currently locked for 30 minutes`],
              validate.error
            )
          );
        } else if(user.login.limit < 3){
          user.login.limit += 1;
          user.save();
  
          if(user.login.limit === 3){
            user.isLocked = true;
            user.save();
            return next(
              new ErrorResponse(
                "Error",
                403,
                [`account currently locked for 30 minutes`],
                validate.error
              )
            );
          } else {
            return next(
              new ErrorResponse(
                "Error",
                403,
                [`incorrect login credentials`],
                validate.error
              )
            );
          }
        }
        else{
          return next(
            new ErrorResponse(
              "Error",
              403,
              [`incorrect login credentials`],
              validate.error
            )
          );
        }
  
      }
    }
    if(method === LoginMethodEnum.EMAIL){

    }


    const today = new Date;
    user.isLocked = false;
    user.login.limit = 0;
    user.login.last = today.toISOString();
    user.login.method = LoginMethodEnum.EMAIL;
    await user.save();

    sendTokenResponse(user._id, res)
  }
  
  if(user.isSuper){
    const isMatched = await user.matchPassword(password);
    if(!isMatched){
      return next(
        new ErrorResponse(
          "Error",
          403,
          [`incorrect login credentials`],
          validate.error
        )
      );
    }

    const today = new Date;
    user.isLocked = false;
    user.login.limit = 0;
    user.login.last = today.toISOString();
    user.login.method = LoginMethodEnum.EMAIL;
    await user.save();

    sendTokenResponse(user._id, res)
  }
}

const activateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { type, token, code } = <activateAccountDTO>req.body;
  const validate = await AuthService.validateAccountVerify(req.body);

  if (validate.error) {
    return next(
      new ErrorResponse(
        "Error",
        validate.code,
        [`${validate.message}`],
        validate.error
      )
    );
  }

  if (type === VerifyTypeEnum.TOKEN) {
    const hash = await SystemService.hashToken(token);
    const today = Date.now();

    const user = await User.findOne({
      activationToken: hash,
      activationTokenExpire: { $gte: today },
    });

    if (!user) {
      return next(new ErrorResponse("Error", 403, [`Token expires`]));
    }

    user.isActivated = true;
    user.activationToken = undefined;
    user.activationTokenExpire = undefined;

    await user.save();
  }
  if(type === VerifyTypeEnum.CODE){
    const today = Date.now();

    const user = await User.findOne({
      emailCode: code,
      emailCodeExpire: { $gte: today },
    });

    if (!user) {
      return next(new ErrorResponse("Error", 403, [`Token expires`]));
    }

    user.isActivated = true;
    user.emailCode = undefined;
    user.emailCodeExpire = undefined;

    await user.save();
  }

  res.status(200).json({
    error: false,
    errors: [],
    data: {},
    message: "successful",
    status: 200,
  });
};

export { register, activateAccount, login };


const sendTokenResponse = async (id: ObjectId, res: Response) =>{
  let token:string = '', mapped: MapLoginResponseDTO | null = null;
  const user = await UserRepository.findById(id, true)

  if(user){
    const roleIds = user.roles.map((x)=> x._id)
    const roleName = user.roles.map((x)=> x._name)
    token = await AuthService.generateAuthToken({id: user._id, email: user.email, roles: roleIds, role: roleName});
    mapped = await AuthMapper.mapLoginResponse(user);
  }

  res.status(200).json({
    error: false,
    errors: [],
    data: mapped,
    token: token,
    message: "successful",
    status: 200,
  });
}
