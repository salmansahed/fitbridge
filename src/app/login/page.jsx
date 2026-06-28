export const metadata = {
  title: "Login",
};

import LoginForm from "@/components/auth/LoginForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-3">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
