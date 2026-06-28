export const metadata = {
  title: "Register",
};

import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center mt-10 py-20 min-h-screen bg-gray-200 px-3">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
