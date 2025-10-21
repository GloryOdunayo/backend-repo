import mongoose, { Model, Schema } from "mongoose";
import slugify from "slugify";
import { IRoleDoc } from "../utils/interfaces.util";

const RoleSchema = new Schema<IRoleDoc>(
  {
    name: {
      type: String,
      unique: [true, "role name already exists"],
      default: "",
      trim: true,
    },
    description: { type: String, default: "" },
    slug: { type: String, unique: true, default: "" },
    users: [{ type: mongoose.Schema.Types.Mixed, ref: "User" }],
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

RoleSchema.set("toJSON", { virtuals: true, getters: true });

RoleSchema.pre<IRoleDoc>("save", async function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Role: Model<IRoleDoc> = mongoose.model<IRoleDoc>("Role", RoleSchema);

export default Role;
