/* eslint-disable @next/next/no-img-element */
import { Add, ExpandMore, Search } from "@material-ui/icons";
import axios from "axios";
import useAuthentication from "hooks/useAuthentication";
import Link from "next/link";
import React, { ReactElement, useEffect, useState } from "react";
import { IRoom } from "../types";
import { AutoComplete, AvatarText } from "./index";
interface Props {}

export default function MainDrawer({}: Props): ReactElement {
  const [value, setValue] = useState("");
  const { user } = useAuthentication();
  const [rooms, setRooms] = useState<IRoom[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/rooms/");
        console.log(
          "🚀 ~ file: MainDrawer.tsx ~ line 17 ~ response",
          response.data
        );
        setRooms(response.data);
      } catch (error) {}
    })();
    return () => {};
  }, []);

  return (
    <>
      <div className="justify-between navbar shadow-navbar min-h-[55px] sm:min-h-16 w-full px-5">
        <h1 className="text-lg font-bold">Channels</h1>
        <button className="btn btn-sm btn-secondary btn-square ">
          <Add />
        </button>
      </div>
      <div className="mb-[55px] sm:mb-16 h-full overflow-y-auto scrollbar-hidden p-5">
        <AutoComplete
          className="bg-base-200"
          type="search"
          left={<Search style={{ margin: "10px" }} />}
          placeholder="Search"
          options={["a", "ab"]}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="mt-7">
          {rooms.map((room: IRoom) => (
            <Link key={room._id} href={"/rooms/" + room._id} passHref>
              <a className="block w-full p-1 my-1 hover:bg-base-200/50 rounded-btn">
                <AvatarText
                  avatar={room.name[0].toUpperCase()}
                  text={room.name}
                />
              </a>
            </Link>
          ))}
          {/* <AvatarText
            className="my-2"
            avatar={<img src="https://picsum.photos/100" alt="" />}
            text="Hussein"
          /> */}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 justify-between navbar shadow-navbar-top min-h-[55px] sm:min-h-16 w-full px-5">
        <div className=" avatar">
          <div className="!flex items-center justify-center w-11 h-11 text-sm text-bold rounded-btn bg-base-200">
            <img src={user?.avatar} alt="user avatar" />
          </div>
        </div>

        <h1 className="text-lg font-bold">{user?.username}</h1>
        <button>
          <ExpandMore />
        </button>
      </div>
    </>
  );
}
