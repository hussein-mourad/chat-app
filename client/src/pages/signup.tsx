import AuthCard from "components/AuthCard";
import { ReactElement } from "react";

export default function signup(): ReactElement {
  return (
    <main className="flex items-center justify-center min-h-screen p-4">
      <AuthCard authType="Signup" url={process.env.BACKEND_URL+"/api/auth/signup"} />
    </main>
  );
}
