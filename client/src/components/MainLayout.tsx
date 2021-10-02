/* eslint-disable @next/next/no-img-element */
import { Close, Send } from "@material-ui/icons";
import React, {
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import IRoom from "types/Room";
import { SocketContext } from "../providers/SocketProvider";
import { ChannelDrawer, Header, InputField, MainDrawer } from "./index";
import MessageForm from "./MessageForm";

interface Props {
  title: string;
  children: ReactNode;
  room?: IRoom;
}

export default function MainLayout({
  title,
  children,
  room,
}: Props): ReactElement {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(
        "🚀 ~ file: MainLayout.tsx ~ line 29 ~ socket.on ~ message",
        message
      );
    });
    return () => {};
  }, [socket]);

  return (
    <div className="min-h-screen drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <Header title={title} />
        <main className="mt-[55px] sm:mt-16 mb-20 p-3 lg:px-10">
          {children}
        </main>
        <MessageForm room={room}/> 
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay">
          <div className="!w-10 !h-10 m-2 mr-3 sm:mr-5 btn btn-sm btn-square bg-base-300 hover:bg-base-200 border-base-300 sm:hidden float-right">
            <Close />
          </div>
        </label>
        <aside className="relative menu w-[85%] sm:w-[70%] lg:w-80 bg-base-300">
          {!room ? (
            <MainDrawer />
          ) : (
            <ChannelDrawer channel={room} />
          )}
        </aside>
      </div>
    </div>
  );
}
