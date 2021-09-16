import { createContext, ReactNode } from "react";
import { io } from "socket.io-client";

const socket = io("", {
  autoConnect: false,
});

export const SocketContext = createContext(socket);
interface Props {
  children: ReactNode;
}
const SocketProvider = ({ children }: Props) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
