/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import type { ReactElement } from "react";

const Home: NextPage = (): ReactElement => {
  return (
    <>
      <div></div>
      <input type="text" className="input bordered " placeholder="Search" />
      <div></div>
    </>
  );
};

export default Home;
