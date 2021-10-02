import { findIndex } from "lodash";
import React, { Fragment, ReactElement, useEffect, useState } from "react";
import IMessage from "types/Message";
import Message from "./Message";

interface Props {
  messages: IMessage[];
}

export default function MessagesWrapper({ messages }: Props): ReactElement {
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    const flapMap = messages.flatMap((message) => {
      return message.createdAt;
    });
    console.log(
      "🚀 ~ file: MessagesWrapper.tsx ~ line 15 ~ useEffect ~ flapMap",
      flapMap
    );
    

    let tmp: any = [];
    messages.forEach((message: IMessage) => {
      let index = findIndex(tmp, (obj: any) => {
        let tmpDate = new Date(obj.date);
        let messageDate = new Date(obj.date);
        return (
          tmpDate.getDate() === messageDate.getDate() &&
          tmpDate.getMonth() === messageDate.getMonth() &&
          tmpDate.getFullYear() === messageDate.getFullYear()
        );
      });
      console.log(
        "🚀 ~ file: MessagesWrapper.tsx ~ line 25 ~ index ~ index",
        index
      );

      if (index == -1) {
        tmp.push({ date: message.createdAt, messages: [message] });
      } else {
        tmp[index].messages.push(message);
      }
    });
    console.log(
      "🚀 ~ file: MessagesWrapper.tsx ~ line 15 ~ useEffect ~ tmp",
      tmp
    );
    setGroups(tmp);
    return () => {};
  }, [messages]);

  const formatDate = (date: string): string => {
    let tmpDate = new Date(date);
    return tmpDate.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col w-full mt-5">
      {groups.map((group) => (
        <Fragment key={group.date}>
          <div
            className="my-0 after:h-px before:h-px before:bg-base-content-2 after:bg-base-content-2 divider text-base-content-2"
            key={group.date}
          >
            {formatDate(group.date)}
          </div>
          <div>
            {group.messages.map((message: IMessage) => (
              <Message message={message} key={message._id} className="my-5" />
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
