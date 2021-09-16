import { compare, genSalt, hash } from "bcrypt";
import { Document, Model, model, Schema } from "mongoose";
import isStrongPassword from "validator/lib/isStrongPassword";

export interface IUser {
  avatar: string;
  username: string;
  password: string;
  currentRoom: string;
}

export interface UserModel extends Model<IUser> {
  login(username: string, password: string): IUser & Document<any, any, IUser>;
  isValidUser(_id: string): IUser & Document<any, any, IUser>;
}

export const userSchema = new Schema<IUser, UserModel, IUser>(
  {
    avatar: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Please enter a username"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minLength: [8, "Minimum length is 8 characters"],
      validate: [
        (str: string) => isStrongPassword(str, { minSymbols: 0 }),
        "Password must contain at least one uppercase, one lowercase, and one number",
      ],
    },
    currentRoom: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    const salt = await genSalt();
    user.password = await hash(user.password, salt);
  }
  next();
});

userSchema.statics.login = async function (username: string, password: string) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await compare(password, user.password);
    if (auth) {
      return user;
    }
  }
  throw new Error("Invalid username and/or password");
};

userSchema.statics.isValidUser = async function (_id: string) {
  const user = await this.findOne({ _id });
  if (user) {
    return user;
  }
  throw new Error("User not found");
};

export default model<IUser, UserModel>("User", userSchema);
