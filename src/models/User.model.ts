import crypto from 'crypto';
import mongoose, { Model, ObjectId, Schema } from "mongoose";
import slugify from "slugify";
import bcrypt from "bcryptjs";
import Role from "./Role.model";
import { IUserDoc } from "../utils/interfaces.util";
import SystemService from '../services/system.service';
import { LoginMethod } from '../utils/enums.util';

const UserSchema = new Schema<IUserDoc>(
  {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: {
      type: String,
      required: [true, "email already exist"],
      unique: [true, "email already exist"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "password must be at least 8 characters"],
      select: false,
    },
    userType: {
      type: String,
      required: true,
      enum: ['superadmin', 'admin', 'vendor', 'customer', 'guest', 'staff', 'user'],
      default: 'user',
    },
    slug: { type: String, unique: true, default: "" },

    activationToken: String,
    activationTokenExpire: mongoose.Schema.Types.Mixed,

    emailCode: String,
    emailCodeExpire: mongoose.Schema.Types.Mixed,

    isSuper: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
    isVendor: {type: Boolean, default: false},
    isCustomer: {type: Boolean, default: false},
    isGuest: {type: Boolean, default: false},
    isStaff: {type: Boolean, default: false},
    isUser: {type: Boolean, default: false},

    isLocked: {type: Boolean, default: false},
  login: {
    last: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    method: { type: String, default: LoginMethod.EMAIL, enum : SystemService.enumToArray(LoginMethod, 'values-only') },
    limit: { type: Number, default: 0 },
  },

    isActivated: {type: Boolean, default: false},
    isActive: {type: Boolean, default: false},
    
    roles: [{ type: mongoose.Schema.Types.Mixed, ref: "Role" }],
  },
  {
    timestamps: true,
    versionKey: "_version",
    toJSON: {
      transform: function (doc: any, ret) {
        ret.id = ret._id;
      },
    },
  }
);

UserSchema.set("toJSON", { virtuals: true, getters: true });

UserSchema.pre<IUserDoc>("save", async function (next) {
    if(!this.isModified("password")){
      return next()
    }
    this.slug = slugify(this.email, { lower: true, strict: true });
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.hasRole = async (name: string, roles: Array<ObjectId | any>): Promise<boolean> => {
    let flag: boolean = false;
    const _role = await Role.findOne({name});

    if(_role){
        for (let i = 0; i < roles.length; i++) {
            if(roles[i].toString() === _role._id.toString()){
                flag = true;
                break;
            } else {
                continue;
            }
        }
    }

    return flag;
}

UserSchema.methods.matchPassword = async function(password: string): Promise<boolean> {
  let isMatched: boolean = false;
  
  if(this.password && this.password.toString() !== ""){
    isMatched = await bcrypt.compare(password, this.password);
  } else {
    isMatched = false;
  }

  return isMatched;
}

UserSchema.methods.getActivatedToken = async function() {
  const token = crypto.randomBytes(20).toString('hex');
  const hash = await SystemService.hashToken(token)

  return { token, hash };
}

const User:Model<IUserDoc> = mongoose.model<IUserDoc>("User", UserSchema);

export default User;