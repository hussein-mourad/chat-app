/* eslint-disable @next/next/no-img-element */
import { Close } from "@material-ui/icons";
import useToggle from "hooks/useToggle";
import React, { ReactElement, ReactNode } from "react";
import IRoom from "types/Room";
import { ChannelDrawer, Header, MainDrawer, NewChannelModal } from ".";
import MessageForm from "./MessageForm";

interface Props {
  title: string;
  children: ReactNode;
  room?: IRoom;
  messageForm?:boolean
}

export default function MainLayout({
  title,
  children,
  room,
  messageForm=true
}: Props): ReactElement {
  const [isModalOpen, toggleModal] = useToggle(false);

  return (
    <div className="min-h-screen drawer drawer-mobile">
      {isModalOpen && (
        <div className="fixed top-0 left-0 z-50 grid w-screen h-screen place-items-center bg-transparent/30">
          <NewChannelModal
            closeHandler={toggleModal}
            className="w-11/12 md:w-[680px]"
          />
        </div>
      )}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <Header title={title} />
        <main className="mt-[55px] sm:mt-16 mb-20 p-3 lg:px-10">
          {children}
        </main>
        {messageForm&&<MessageForm room={room} />}
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay">
          <div className="!w-10 !h-10 m-2 mr-3 sm:mr-5 btn btn-sm btn-square bg-base-300 hover:bg-base-200 border-base-300 sm:hidden float-right">
            <Close />
          </div>
        </label>
        <aside className="menu w-[85%] sm:w-[70%] lg:w-80 bg-base-300">
          {!room ? (
            <MainDrawer toggleModal={toggleModal} />
          ) : (
            <ChannelDrawer channel={room} />
          )}
        </aside>
      </div>
    </div>
  );
}
