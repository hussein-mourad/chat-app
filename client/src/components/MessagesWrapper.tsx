/* eslint-disable react-hooks/exhaustive-deps */
import {useArray, useAuthentication} from "../hooks";
import React, {
  Fragment,
  ReactElement,
  useContext,
  useEffect,
  useRef,
} from "react";
import { SocketContext } from "src/providers/SocketProvider";
import IMessage from "types/Message";
import Message from "./Message";
import cn from "classnames"

interface Props {
  messages: IMessage[];
}

interface IGroup {
  date: string;
  messages: IMessage[];
}

export default function MessagesWrapper({
  messages: originalMessages,
}: Props): ReactElement {
  const socket = useContext(SocketContext);
  const { array: groups, set: setGroups } = useArray<IGroup>([]);
  const { array: messages, push: pushMessage } =
    useArray<IMessage>(originalMessages);
  const ref = useRef<HTMLDivElement>(null);
  const {user}  = useAuthentication();

  useEffect(() => {
    socket.on("message", (message: IMessage) => {
      console.log("message received");
      pushMessage(message);

      setTimeout(() => {
        ref.current && ref.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
    return () => {};
  }, []);

  useEffect(() => {
    let tmp: any = {};
    messages.forEach((message: IMessage) => {
      let date = message.createdAt.split("T")[0];
      if (date in tmp) tmp[date].push(message);
      else tmp[date] = [message];
    });

    tmp = Object.keys(tmp).map((date) => {
      return {
        date,
        messages: tmp[date],
      };
    });
    setTimeout(() => {
      ref.current && ref.current.scrollIntoView({ behavior: "smooth" });
    }, 100);

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
            className="y-0 after:h-px before:h-px before:bg-base-content-2 after:bg-base-content-2 divider text-base-content-2"
            key={group.date}
          >
            {formatDate(group.date)}
          </div>
          <div>
            {group.messages.map((message: IMessage) => {
              const style = cn("my-5", {"justify-end": message.sender._id===user?._id})
              
              return (
                <Message
                  message={message}
                  key={message._id}
                  className={style}
                />
              );
            })}
          </div>
        </Fragment>
      ))}
      <div ref={ref}></div>
    </div>
  );
}
