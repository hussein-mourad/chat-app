/* eslint-disable @next/next/no-img-element */
import { ReactElement } from "react";
import IMessage from "types/Message";

interface Props {
  className?:string;
  message:IMessage;
}

export default function Message({className='',message}: Props): ReactElement {
  const formatDate=():string=>{
    const now = new Date();
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate()-1);
    const messageDate = new Date(message.createdAt);
    const messageTime = messageDate.toLocaleString('en-US', {hour:'numeric', minute:'numeric'});;
    let str="";
    if(now.getTime()=== messageDate.getTime()){
      str += "today at ";
      str+= messageTime;
    } else if(yesterday.getTime()===messageDate.getTime()){
      str += "yesterday at ";
      str+=messageTime;
    } else {
      str = messageDate.toLocaleString('en-US', {month:"short",day:"numeric"}) + " at " + messageTime;
    }
   return str; 
  }

  return (
    <div className={`${className} flex`}>
      <div className="mr-5 avatar">
        <div className="mt-1 w-11 h-11 rounded-btn">
          <img src={message.sender.avatar} alt="" />
        </div>
      </div>
      <div>
        <p className="flex items-center text-base-content-2">
          <span className="text-lg font-bold">{message.sender.username}</span> <span className="ml-2 text-sm font-medium">{formatDate()}</span>{" "}
        </p>
        <p className="text-lg font-medium">{message.body}</p>
      </div>
    </div>
  );
}
