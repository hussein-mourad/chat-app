import { IUser } from ".";
import IMessage from "./Message";

export default interface IRoom {
  _id:string
  name:string,
  description:string,
  members:IUser[],
  messages:IMessage[]
}