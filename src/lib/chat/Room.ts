import { model, PopulatedDoc, Schema } from "mongoose";
import { IUser } from "../auth/User";
import { IMessage } from "./Message";

export interface IRoom {
  name: string;
  description: string;
  members: [PopulatedDoc<IUser & Document>];
  messages: [PopulatedDoc<IMessage & Document>];
}

export const roomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
      maxLength: [30, "Name is too long."],
      required: [true, "You must enter a name."],
      unique:true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxLength: [300, "Description is too long."],
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

export default model<IRoom>("Room", roomSchema);
