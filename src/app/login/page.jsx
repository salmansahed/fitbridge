export const metadata = {
  title: "Login",
};

import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-3">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
