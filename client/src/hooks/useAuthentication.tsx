import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import IUser from "types/User";


export default function useAuthentication() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(process.env.BACKEND_URL+"/api/auth/");
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
