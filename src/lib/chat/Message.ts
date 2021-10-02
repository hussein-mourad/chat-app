import { Document, model, PopulatedDoc, Schema } from "mongoose";
import { IUser } from "../auth/User";
import { IRoom } from "./Room";

export interface IMessage {
  sender: PopulatedDoc<IUser & Document>;
  room: PopulatedDoc<IRoom & Document>;
  body: string;
}

export const messageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
    body: {
      type: String,
      trim: true,
      maxLength: [500, "This message is too long."],
    },
  },
  { timestamps: true }
);

export default model<IMessage>("Message", messageSchema);
