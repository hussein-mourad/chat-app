/* eslint-disable @next/next/no-img-element */
import { Close, Send } from "@material-ui/icons";
import React, { ReactElement, ReactNode } from "react";
import { Header, InputField, MainDrawer } from "./index";

interface Props {
  title: string;
  children: ReactNode;
}

export default function MainLayout({ title, children }: Props): ReactElement {
  return (
    <div className="min-h-screen drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <Header title={title} />
        <main className="mt-[55px] sm:mt-16 mb-20 p-3 lg:px-10">
          {children}
        </main>
        <div className="fixed bottom-0 right-0 flex items-center justify-center w-screen lg:w-[calc(100%-320px)] h-20 px-3 sm:px-10 bg-base-100">
          <InputField
            placeholder="Type a message here"
            right={
              <div>
                <button className="m-1 btn btn-primary btn-square btn-sm">
                  <Send style={{ fontSize: 15 }} />
                </button>
              </div>
            }
          />
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay">
          <div className="!w-10 !h-10 m-2 mr-3 sm:mr-5 btn btn-sm btn-square bg-base-300 hover:bg-base-200 border-base-300 sm:hidden float-right">
            <Close />
          </div>
        </label>
        <aside className="relative menu w-[85%] sm:w-[70%] lg:w-80 bg-base-300">
          <MainDrawer />
        </aside>
      </div>
    </div>
  );
}
