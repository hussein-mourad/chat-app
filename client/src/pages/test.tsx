import type { NextPage } from "next";
import type { ReactElement } from "react";
import React from "react";

const Home: NextPage = (): ReactElement => {
  return (
    <div className="min-h-screen drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col items-center justify-center drawer-content">
        <label
          htmlFor="my-drawer-2"
          className="mb-4 btn btn-primary drawer-button lg:hidden"
          tabIndex={0}
        >
          open menu
        </label>
        <div className="hidden text-xs text-center lg:block">
          Menu is always open on desktop size.
          <br />
          Resize the browser to see toggle button on mobile size
        </div>
        <div className="text-xs text-center lg:hidden">
          Menu can be toggled on mobile size.
          <br />
          Resize the browser to see fixed sidebar on desktop size
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="p-4 overflow-y-auto menu w-80 bg-base-100">
          <li>
            <button className="btn btn-ghost">Menu Item</button>
          </li>
          <li>
            <button className="btn btn-ghost">Menu Item</button>
          </li>
        </ul>
      </div>
    </div>

    // <div className="min-h-screen rounded-lg shadow bg-base-200 drawer">
    //   <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
    //   <div className="flex flex-col drawer-content">
    //     <div className="w-full navbar bg-base-300">
    //       <div className="flex-none lg:hidden">
    //         <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             className="inline-block w-6 h-6 stroke-current"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               d="M4 6h16M4 12h16M4 18h16"
    //             ></path>
    //           </svg>
    //         </label>
    //       </div>

    //       <div className="flex-1 px-2 mx-2">
    //         <span>Change screen size to show/hide menu</span>
    //       </div>
    //       <div className="flex-none hidden lg:block">
    //         <ul className="menu horizontal">
    //           <li>
    //             <a className="rounded-btn">Item 1</a>
    //           </li>
    //           <li>
    //             <a className="rounded-btn">Item 2</a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //     Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, dolorum.
    //     Facilis provident recusandae, voluptas veritatis, rem dolor unde sint
    //     praesentium asperiores, ex ea? Optio quo iure, aperiam libero amet
    //     accusantium.
    //   </div>
    //   <div className="drawer-side">
    //     <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
    //     <ul className="p-4 overflow-y-auto menu w-[500px] bg-base-100">
    //       <li>
    //         <a>Item 1</a>
    //       </li>
    //       <li>
    //         <a>Item 2</a>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
  );
};

export default Home;

// <div className="mx-10 my-5">
//   <Input left={<Search style={{ margin: "10px" }} />} />
//   <Input label="hi" />
//   <div className="mt-5">
//     <AutoComplete options={["a", "b", "c"]} />
//   </div>
// </div>
