/* eslint-disable @next/next/no-img-element */
import { ReactElement } from "react";

interface Props {
  className?:string;
  image:string;
  sender:string;
  date:string;
  message:string;
}

export default function Message({className='',image,sender,date,message}: Props): ReactElement {
  const formatDate=():string=>{
    const now = new Date();
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate()-1);
    const messageDate = new Date(date);
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
    <div className={`${className} flex w-full rounded-box`}>
      <div className="mr-5 avatar">
        <div className="mt-1 w-11 h-11 rounded-btn">
          <img src={image} alt="" />
        </div>
      </div>
      <div>
        <p className="flex items-center text-base-content-2">
          <span className="text-lg font-bold">{sender}</span> <span className="ml-2 text-sm font-medium">{formatDate()}</span>{" "}
        </p>
        <p className="text-lg font-medium">{message}</p>
      </div>
    </div>
  );
}
