import { Close } from "@material-ui/icons";
import React, { ReactElement, ReactNode } from "react";
import { Drawer } from "..";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props): ReactElement {
  return (
    <>
      <div className="fixed top-0 left-0 z-50 flex w-screen h-screen md:w-80 bg-black/20 md:bg-transparent">
        <div className="w-[85%] md:w-full">
          <Drawer text={"All channels"} />
        </div>
        <button className="!w-10 !h-10 m-2 btn btn-sm btn-square bg-base-300 hover:bg-base-200 border-base-300 md:hidden">
          <Close />
        </button>
      </div>
      <main className="md:ml-80 mt-[55px] sm:mt-16">{children}</main>
    </>
  );
}
