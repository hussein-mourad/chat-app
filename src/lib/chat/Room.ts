import { model, PopulatedDoc, Schema } from "mongoose";
import { IUser } from "../auth/User";
import { IMessage } from "./Message";

export interface IRoom {
  members: [PopulatedDoc<IUser & Document>];
  messages: [PopulatedDoc<IMessage & Document>];
}

export const roomSchema = new Schema<IRoom>(
  {
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
