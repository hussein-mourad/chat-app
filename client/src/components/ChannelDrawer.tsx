/* eslint-disable @next/next/no-img-element */
import { ArrowBackIos, ExpandMore } from "@material-ui/icons";
import useAuthentication from "hooks/useAuthentication";
import Link from "next/link";
import { ReactElement, useState } from "react";
import IRoom from "types/Room";
import { AvatarText } from "./index";


interface Props {
  channel:IRoom
}

export default function ChannelDrawer({channel}: Props): ReactElement {
  const [value, setValue] = useState("");
  const { user } = useAuthentication();

  return (
    <>
      <div className="px-5 navbar shadow-navbar min-h-[55px] sm:min-h-16">
        <Link href="/" passHref>
          <a className="block mr-3">
            <ArrowBackIos />
          </a>
        </Link>
        <h1 className="text-lg font-bold">All channels</h1>
      </div>
      <div className="mb-[55px] sm:mb-16 h-full overflow-y-auto scrollbar-hidden p-5">
      <h1 className="mb-5 text-lg font-bold">{channel.name}</h1>
      <p>{channel.description}</p>
        <div className="mt-8">
          {
            channel.members.map(member=>(
              <AvatarText key={member._id} avatar={<img src={member.avatar} alt="avatar"/>} text={member.username} className="my-3" />
            ))
          }
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

//TODO
//[ ] Change MainDrawer and ChannelDrawer to a Drawer that takes children 