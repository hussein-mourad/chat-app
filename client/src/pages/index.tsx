import useAuthentication from "hooks/useAuthentication";
import type { NextPage } from "next";
import { ReactElement, useContext, useEffect, useState } from "react";
import { LoadingScreen, MainLayout } from "../components";
import { SocketContext } from "../providers/SocketProvider";

const Home: NextPage = (): ReactElement => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState<string[]>([]);
  const { isLoading } = useAuthentication();

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log(`connect ${socket.id}`);
    });
    // socket.disconnect()
    socket.on("disconnect", () => {
      console.log(socket.id);
    });

    socket.on("message", (data) => {
      setMessages(messages =>[...messages, data]);
    });

    return () => {};
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <MainLayout title={"Front-end development"}>
      {messages.map((message, index) => (
        <p key={message + index}>{message}</p>
      ))}
    </MainLayout>
  );
};

export default Home;
