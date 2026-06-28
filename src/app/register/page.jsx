export const metadata = {
  title: "Register",
};

import RegisterForm from "@/components/auth/RegisterForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex items-center justify-center mt-10 py-20 min-h-screen bg-gray-200 px-3">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
