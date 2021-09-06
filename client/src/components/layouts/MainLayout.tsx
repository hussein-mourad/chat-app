/* eslint-disable @next/next/no-img-element */
import { ArrowBackIos, Close, ExpandMore } from "@material-ui/icons";
import Header from "components/common/Header";
import React, { ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props): ReactElement {
  return (
    <div className="min-h-screen drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="flex flex-col items-center justify-center drawer-content">
        <Header title="Front-end developer" />
        <main></main>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay">
          <div className="!w-10 !h-10 m-2 mr-3 sm:mr-5 btn btn-sm btn-square bg-base-300 hover:bg-base-200 border-base-300 sm:hidden float-right">
            <Close />
          </div>
        </label>
        <aside className="relative menu w-[85%] sm:w-[70%] lg:w-80 bg-base-300">
          <div className="px-5 navbar shadow-navbar min-h-[55px] sm:min-h-16">
            <button className="mr-3">
              <ArrowBackIos />
            </button>
            <h1 className="text-lg font-bold">gfkgjf</h1>
          </div>
          <div className="mb-[55px] sm:mb-16 h-full overflow-y-auto scrollbar-hidden p-5"></div>
          <div className="absolute bottom-0 left-0 justify-between navbar shadow-navbar-top min-h-[55px] sm:min-h-16 w-full">
            <img src="" alt="" />
            <h1 className="text-lg font-bold">dfgdkfj</h1>
            <button className="mr-3">
              <ExpandMore />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
