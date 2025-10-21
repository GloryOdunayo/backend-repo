import { Document, ObjectId } from "mongoose";

export interface ISGOptions {
  apiKey: string,
  engine: "ejs" | "hbs",
  to: string | Array<string>,
  from: string,
  subject: string,
  text: string,
  html: any,
  replyTO?: string,
}

export interface INodemailer {
  send(data: ISGOptions, callback: CallableFunction): void,
}

export interface IResult {
  error: boolean,
  message: string,
  code: number,
  data: any,
}

export interface IRoleDoc {
  name: string,
  description: string,
  slug: string,

  users: Array<ObjectId | any>,

  createdAt: Date,
  updatedAt: Date,
  _version: number,
  _id: ObjectId,
  id: ObjectId,
}

export interface IUserDoc extends Document {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  slug: string,
  userType: string,

  isSuper: boolean,
  isAdmin: boolean,
  isVendor: boolean,
  isCustomer: boolean,
  isGuest: boolean,
  isStaff: boolean,
  isUser: boolean,

  isLocked: boolean,
  login: {
    last: Date | any,
    method: string,
    limit: number,
  },

  isActivated: boolean,
  isActive: boolean,

  emailCode: string | undefined,
  emailCodeExpire: Date | any,

  activationToken: string | undefined,
  activationTokenExpire: Date | any,

  roles: Array<ObjectId | any>,

  createdAt: Date,
  updatedAt: Date,
  _version: number,
  _id: ObjectId,
  id: ObjectId,

  hasRole(name: string, roles: Array<ObjectId | any>): Promise<boolean>,
  comparePassword(password: string): Promise<boolean>,
  matchPassword(password: string): Promise<boolean>,
  getActivatedToken(): Promise<{ token: string, hash: string }>,
//   getActivationCode(): Promise<{ token: string, hash: string }>,
}
