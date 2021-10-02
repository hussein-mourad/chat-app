import LoadingScreen from "components/LoadingScreen";
import type { NextPage } from "next";
import type { ReactElement } from "react";
import React from "react";

const Home: NextPage = (): ReactElement => {
  return <LoadingScreen/>;
};

export default Home;
