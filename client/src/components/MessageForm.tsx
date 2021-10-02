import { Send } from "@material-ui/icons";
import {
  ReactElement,
  useContext,
  useState,
} from "react";
import { SocketContext } from "src/providers/SocketProvider";
import { InputField } from ".";
import { IRoom } from "../types/";

interface Props {
  room?: IRoom;
}

export default function MessageForm({ room }: Props): ReactElement {
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    console.log(room);
    socket.emit("send_message", { room: room?._id, message });
  };

  return (
    <form
      className="fixed bottom-0 right-0 flex items-center justify-center w-screen lg:w-[calc(100%-320px)] h-20 px-3 sm:px-10 bg-base-100"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <InputField
        placeholder="Type a message here"
        className="bg-base-200"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        right={
          <div>
            <button
              className="m-1 btn btn-primary btn-square btn-sm"
              onClick={sendMessage}
            >
              <Send style={{ fontSize: 15 }} />
            </button>
          </div>
        }
      />
    </form>
  );
}
