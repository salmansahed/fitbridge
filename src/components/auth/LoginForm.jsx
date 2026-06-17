"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  InputGroup,
} from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { toast } from "react-toastify";
import { FiLogIn } from "react-icons/fi";

const LoginForm = () => {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    const { error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
      rememberMe: true,
      callbackURL: "/",
    });
    if (error) {
      toast.error("Login failed: " + error.message);
    } else {
      toast.success("Login successful! Redirecting...");
      router.push("/");
    }
  };

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <Form
      className="flex w-full max-w-lg flex-col gap-5 shadow-2xl shadow-indigo-600/10 dark:shadow-black/40 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/80 p-6 md:p-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl"
      onSubmit={onSubmit}
    >
      <div className="space-y-1 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Login to Your Account
        </h2>
        <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
          Enter your credentials to access FitBridge
        </p>
      </div>

      {/* Email Field */}
      <TextField
        isRequired
        className="w-full flex flex-col gap-1.5"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Email
        </Label>
        <Input
          name="email"
          type="email"
          placeholder="Enter your email address"
          className="h-12 text-sm rounded-xl border-zinc-200 dark:border-zinc-800 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 bg-zinc-50/50 dark:bg-zinc-950/50 transition-all duration-200"
        />
        <FieldError className="text-xs font-medium text-rose-500 mt-0.5" />
      </TextField>

      {/* Password Field */}
      <TextField
        className="w-full flex flex-col gap-1.5"
        name="password"
        isRequired
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
      >
        <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Password
        </Label>
        <InputGroup className="h-12 border rounded-xl border-zinc-200 dark:border-zinc-800 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 bg-zinc-50/50 dark:bg-zinc-950/50 overflow-hidden transition-all duration-200">
          <InputGroup.Input
            name="password"
            className="w-full h-full text-sm pl-3 border-none bg-transparent focus:ring-0 focus:outline-hidden"
            type={isVisible ? "text" : "password"}
            placeholder="Enter your password"
          />
          <InputGroup.Suffix className="pr-3 flex items-center bg-transparent">
            <Button
              isIconOnly
              aria-label={isVisible ? "Hide password" : "Show password"}
              size="sm"
              variant="light"
              className="hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg text-zinc-500"
              onPress={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <Eye className="size-4.5" />
              ) : (
                <EyeSlash className="size-4.5" />
              )}
            </Button>
          </InputGroup.Suffix>
        </InputGroup>

        <Description className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
          Must be at least 8 characters with 1 uppercase and 1 number
        </Description>

        <FieldError className="text-xs font-medium text-rose-500 mt-0.5" />
      </TextField>

      {/* Login Button */}
      <div className="flex gap-2 pt-2">
        <Button
          type="submit"
          className="w-full h-12 text-sm font-semibold text-white bg-linear-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 shadow-md shadow-indigo-600/20 rounded-md hover:rounded-3xl transition-all duration-300 active:scale-98 group"
        >
          <FiLogIn className="group-hover:translate-x-2 transition-all duration-300" />
          Login
        </Button>
      </div>

      <div className="relative flex py-1 items-center">
        <div className="grow border-t border-zinc-200 dark:border-zinc-800"></div>
        <span className="shrink mx-4 text-xs font-medium text-zinc-400 dark:text-zinc-500">
          OR
        </span>
        <div className="grow border-t border-zinc-200 dark:border-zinc-800"></div>
      </div>

      {/* Social Login Button */}
      <div className="flex flex-col gap-3 items-center justify-center">
        <Button
          onClick={handleGoogleLogin}
          variant="secondary"
          className="h-12 w-full font-medium rounded-md hover:rounded-3xl text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 shadow-xs transition-all duration-200 active:scale-98"
        >
          <FcGoogle className="size-5 mr-1" />
          Continue with Google
        </Button>
      </div>

      <div className="flex items-center justify-center pt-1">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default LoginForm;
