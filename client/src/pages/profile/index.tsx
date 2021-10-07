import Footer from "components/Footer";
import LoadingScreen from "components/LoadingScreen";
import NavBar from "components/NavBar";
import Profile from "components/Profile";
import useAuthentication from "hooks/useAuthentication";
import Head from "next/head";
import { ReactElement } from "react";

export default function ProfilePage(): ReactElement {
  const { user } = useAuthentication();

  if (!user) return <LoadingScreen />;
  return (
    <div className="container p-3 mx-auto md:p-5">
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src *;
   img-src * 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' *;
   style-src  'self' 'unsafe-inline' *"
        />
      </Head>
      <NavBar user={user} />
      <div className="flex flex-col items-center justify-center max-w-3xl mx-auto mt-8 ">
        <h1 className="text-3xl">Personal info</h1>
        <p className="mt-2 dark:text-gray-200">
          Basic info, like your name and photo
        </p>
        <Profile user={user} />
        <Footer className="flex mt-2" />
      </div>
    </div>
  );
}
