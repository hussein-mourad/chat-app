/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Add, Search } from "@material-ui/icons";
import axios from "axios";
import Link from "next/link";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { SocketContext } from "src/providers/SocketProvider";
import { AutoComplete, AvatarText, DropDownMenu } from ".";
import { useArray, useAuthentication } from "../hooks";
import { IRoom } from "../types";

interface Props {
  toggleModal: () => void;
}

export default function MainDrawer({ toggleModal }: Props): ReactElement {
  const [searchKey, setSearchKey] = useState("");

  const { user } = useAuthentication();
  const { array: rooms, set: setRooms, push: pushRoom } = useArray<IRoom>([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(process.env.BACKEND_URL+"/api/rooms/");
        setRooms(response.data);
      } catch (error) {
        console.log(error);
      }
    })();

    socket.connect();
    socket.on("room added", (room) => {
      pushRoom(room);
    });
    return () => {};
  }, []);

  return (
    <>
      <div className="justify-between navbar shadow-navbar min-h-[55px] sm:min-h-16 w-full px-5">
        <h1 className="text-lg font-bold">Channels</h1>
        <button
          className="btn btn-sm btn-secondary btn-square "
          onClick={toggleModal}
        >
          <Add />
        </button>
      </div>
      <div className="mb-[55px] sm:mb-16 h-full overflow-y-auto scrollbar-hidden p-5">
        <AutoComplete
          className="bg-base-200"
          type="search"
          left={<Search style={{ margin: "10px" }} />}
          placeholder="Search"
          options={rooms.flatMap((room) => room.name)}
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <div className="mt-7">
          {rooms
            .filter((room) => room.name.includes(searchKey))
            .map((room: IRoom) => (
              <Link key={room._id} href={"/rooms/" + room._id} passHref>
                <a className="block w-full p-1 my-1 hover:bg-base-200/50 rounded-btn">
                  <AvatarText
                    avatar={room.name[0].toUpperCase()}
                    text={room.name}
                  />
                </a>
              </Link>
            ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 justify-between navbar shadow-navbar-top min-h-[55px] sm:min-h-16 w-full px-5">
        <div className=" avatar">
          <div className="!flex items-center justify-center w-11 h-11 text-sm text-bold rounded-btn bg-base-200">
            <img src={user?.avatar} alt="user avatar" />
          </div>
        </div>

        <h1 className="text-lg font-bold">{user?.username}</h1>
        <DropDownMenu />
      </div>
    </>
  );
}
