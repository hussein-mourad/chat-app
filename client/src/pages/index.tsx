/* eslint-disable react-hooks/exhaustive-deps */
import useAuthentication from "hooks/useAuthentication";
import type { NextPage } from "next";
import { ReactElement, useContext, useEffect, useState } from "react";
import { LoadingScreen, MainLayout } from "../components";
import { SocketContext } from "../providers/SocketProvider";

const Home: NextPage = (): ReactElement => {
  const { isLoading } = useAuthentication();

  if (isLoading) return <LoadingScreen />;

  return (
    <MainLayout title={"Welcome"} messageForm={false}>
      <h1 className="mt-3 text-2xl font-medium tracking-wide">
        Welcome to chat app join a room to get started.
      </h1>
      
    </MainLayout>
  );
};

export default Home;
