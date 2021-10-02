import IRoom from "./Room";

export default interface IUser {
  _id:string,
  username:string,
  currentRoom:IRoom|null
  avatar:string
}