/* eslint-disable @next/next/no-img-element */
import { Add, ExpandMore, Search } from "@material-ui/icons";
import React, { ReactElement, useState } from "react";
import { AutoComplete, AvatarText } from "./index";
interface Props {}

export default function MainDrawer({}: Props): ReactElement {
  const [value, setValue] = useState("");
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
          left={<Search style={{ margin: "10px" }} />}
          placeholder="Search"
          options={["a", "ab"]}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div>
          <AvatarText
            className="my-2"
            avatar={<img src="https://picsum.photos/100" alt="" />}
            text="Hussein"
          />
          <AvatarText avatar="H" text="Hussein" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 justify-between navbar shadow-navbar-top min-h-[55px] sm:min-h-16 w-full">
        <img src="" alt="" />
        <h1 className="text-lg font-bold">dfgdkfj</h1>
        <button className="mr-3">
          <ExpandMore />
        </button>
      </div>
    </>
  );
}

// <div className="px-5 navbar shadow-navbar min-h-[55px] sm:min-h-16">
//         <button className="mr-3">
//           <ArrowBackIos />
//         </button>
//         <h1 className="text-lg font-bold">gfkgjf</h1>
//       </div>
