import AuthCard from "components/AuthCard";
import { ReactElement } from "react";

export default function login(): ReactElement {
  return (
    <main className="flex items-center justify-center min-h-screen p-4">
      <AuthCard authType="Login" url={process.env.BACKEND_URL+"/api/auth/login"} />
    </main>
  );
}
