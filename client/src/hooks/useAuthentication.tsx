import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IUser {
  id: string;
  username: string;
  currentRoom: string;
  avatar: string;
}

export default function useAuthentication() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post("/api/auth/");
        setUser(response.data);
        setIsLoading(false);
      } catch (err) {
        router.push("/login");
      }
    })();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, isLoading };
}
