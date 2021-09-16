/* eslint-disable @next/next/no-img-element */
import { ArrowBackIos, ExpandMore, Search } from "@material-ui/icons";
import useAuthentication from "hooks/useAuthentication";
import React, { ReactElement, useState } from "react";
import { AutoComplete, AvatarText } from "./index";
interface Props {}

export default function MainDrawer({}: Props): ReactElement {
  const [value, setValue] = useState("");
  const { user } = useAuthentication();

  return (
    <>
      <div className="px-5 navbar shadow-navbar min-h-[55px] sm:min-h-16">
        <button className="mr-3">
          <ArrowBackIos />
        </button>
        <h1 className="text-lg font-bold">gfkgjf</h1>
      </div>
      <div className="mb-[55px] sm:mb-16 h-full overflow-y-auto scrollbar-hidden p-5">
        <AutoComplete
          className="bg-base-200"
          left={<Search style={{ margin: "10px" }} />}
          placeholder="Search"
          options={["a", "ab"]}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="mt-8">
          {/* <AvatarText
            className="my-2"
            avatar={<img src="https://picsum.photos/100" alt="" />}
            text="Hussein"
          /> */}
          <AvatarText avatar="H" text="Hussein" />
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
