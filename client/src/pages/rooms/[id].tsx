import useAuthentication from "hooks/useAuthentication";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/router";
import { ReactElement, useContext, useEffect } from "react";
import { SocketContext } from "src/providers/SocketProvider";
import IRoom from "types/Room";
import { LoadingScreen, MainLayout, MessagesWrapper } from "../../components";

interface Props {}

export default function Room({}: Props): ReactElement {
  const router = useRouter();
  const socket = useContext(SocketContext);
  const { isLoading, user } = useAuthentication();
  const { data: room, error } = useFetch<IRoom>(
    "/api/rooms/" + router.query.id
  );

  

  useEffect(() => {
    socket.connect();
    return () => {
      
    }
  }, [socket])

  if (error) return <div>error TODO</div>;
  if (!room || isLoading) return <LoadingScreen />;

  return (
    <div>
      <MainLayout title={room.name} room={room}>
        <MessagesWrapper messages={room.messages} />
      </MainLayout>
    </div>
  );
}
