"use client";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  InputGroup,
  ListBox,
  Select,
} from "@heroui/react";

import { Eye, EyeSlash } from "@gravity-ui/icons";
import Link from "next/link";
import { useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IoPersonAddOutline } from "react-icons/io5";
import Image from "next/image";
import useImageUpload from "@/lib/image-upload/useImageUpload";
import { MdDeleteForever, MdDriveFolderUpload } from "react-icons/md";

const RegisterForm = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [photoRequiredError, setPhotoRequiredError] = useState("");
  const fileInputRef = useRef(null);

  const {
    previewUrl,
    serverUrl,
    isUploading,
    error: imageError,
    handleImageChange,
    handleRemoveImage,
  } = useImageUpload();

  const handleBtnPress = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    if (isUploading) {
      toast.warning("Please wait, photo is still uploading...");
      return;
    }

    if (!serverUrl) {
      setPhotoRequiredError(
        "Profile photo is required. Please upload an image.",
      );
      return;
    } else {
      setPhotoRequiredError("");
    }

    const { data, error } = await authClient.signUp.email({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      image: serverUrl,
      // role: userData.role,
    });

    if (error) {
      toast.error("Registration failed: " + error.message);
    } else {
      toast.success("Registration successful! Redirecting to login...");
      // router.push("/login");
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      className="flex w-full max-w-xl flex-col gap-5 shadow-2xl shadow-indigo-600/10 dark:shadow-black/40 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/80 p-6 md:p-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl"
    >
      <div className="space-y-1 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Register Your Account
        </h2>
        <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
          Join StudyNook to book your study space
        </p>
      </div>

      {/* Name Field */}
      <TextField
        isRequired
        name="name"
        type="text"
        className="w-full flex flex-col gap-1.5"
        validate={(value) => {
          if (value.length < 2) {
            return "Name must be at least 2 characters";
          }
          return null;
        }}
      >
        <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Name
        </Label>
        <Input
          placeholder="Enter your name"
          className="h-12 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 bg-zinc-50/50 dark:bg-zinc-950/50 transition-all duration-200"
        />
        <FieldError className="text-xs font-medium text-rose-500 mt-0.5" />
      </TextField>

      {/* Email Field */}
      <TextField
        isRequired
        name="email"
        type="email"
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
          placeholder="Enter your email address"
          className="h-12 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 bg-zinc-50/50 dark:bg-zinc-950/50 transition-all duration-200"
        />
        <FieldError className="text-xs font-medium text-rose-500 mt-0.5" />
      </TextField>

      {/* Photo Field */}
      <TextField isRequired>
        <Label>Photo</Label>

        <input
          ref={fileInputRef}
          onChange={(e) => {
            handleImageChange(e);
            setPhotoRequiredError("");
          }}
          type="file"
          name="photo"
          className="hidden"
          accept="image/*"
        />

        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            type="button"
            className="w-full h-12 rounded-xl text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onPress={handleBtnPress}
          >
            {isUploading
              ? "Uploading Image..."
              : serverUrl
                ? "Image Selected ✓"
                : "Upload Photo"}
            <MdDriveFolderUpload />
          </Button>

          {/* Image Preview */}
          {previewUrl && (
            <div className="relative w-full h-40 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
              <Image
                src={previewUrl}
                alt="Preview"
                height={160}
                width={160}
                unoptimized
                className="h-full w-auto object-contain rounded-xl"
              />
              {/* Remove Image Button */}
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 text-xs font-medium rounded-lg transition-colors shadow-lg cursor-pointer"
              >
                <MdDeleteForever className="text-xl" />
              </button>
            </div>
          )}
        </div>

        {/* Image Error Message */}
        {imageError && (
          <p className="text-xs font-medium text-rose-500 mt-0.5">
            {imageError}
          </p>
        )}
        {photoRequiredError && (
          <p className="text-xs font-medium text-rose-500 mt-0.5">
            {photoRequiredError}
          </p>
        )}
      </TextField>

      {/* Select Field */}
      {/* <Select placeholder="Select one" name="role" isRequired>
        <Label>Select Role</Label>
        <Select.Trigger className="py-3 border border-zinc-200 rounded-xl bg-zinc-50/50">
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item id="buyer" textValue="Buyer">
              Buyer
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="seller" textValue="Seller">
              Seller
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select> */}

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

      {/* Create Account Button */}
      <div className="flex gap-2 pt-2">
        <Button
          type="submit"
          disabled={isUploading}
          className="w-full h-12 text-sm font-semibold text-white bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-md shadow-indigo-600/20 rounded-md hover:rounded-3xl transition-all duration-300 active:scale-98 group"
        >
          <IoPersonAddOutline className="group-hover:scale-125 transition-all duration-300" />
          {isUploading ? "Uploading Photo..." : "Create Account"}
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
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default RegisterForm;
