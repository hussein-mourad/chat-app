import { IRoom, IUser } from ".";

export default interface IMessage {
  _id: string;
  sender: IUser;
  room: IRoom;
  body: string;
  createdAt:string
}
