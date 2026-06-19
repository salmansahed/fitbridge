"use client";

import { FloppyDisk } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";
import { useRef, useState } from "react";
import { RxPlus } from "react-icons/rx";
import Image from "next/image";
import { toast } from "react-toastify";
import useImageUpload from "@/lib/image-upload/useImageUpload";
import { MdDeleteForever, MdDriveFolderUpload } from "react-icons/md";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const AddClassForm = () => {
  const router = useRouter();
  const [selectedDays, setSelectedDays] = useState([]);
  const [photoRequiredError, setPhotoRequiredError] = useState("");
  const [daysError, setDaysError] = useState("");

  const fileInputRef = useRef(null);

  const {
    previewUrl,
    serverUrl,
    isUploading,
    error: imageError,
    handleImageChange,
    handleRemoveImage,
  } = useImageUpload();

  const categories = [
    { value: "yoga", label: "Yoga" },
    { value: "pilates", label: "Pilates" },
    { value: "stretching", label: "Stretching" },
    { value: "cardio", label: "Cardio" },
    { value: "dance", label: "Dance" },
    { value: "strength", label: "Strength Training" },
    { value: "fitness", label: "Fitness" },
  ];

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      const updatedDays = selectedDays.filter((d) => d !== day);
      setSelectedDays(updatedDays);
      if (updatedDays.length === 0) {
        setDaysError("Please select at least one schedule day");
      }
    } else {
      setSelectedDays([...selectedDays, day]);
      setDaysError("");
    }
  };

  const handleBtnPress = () => {
    fileInputRef.current?.click();
  };

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const classData = Object.fromEntries(formData.entries());

    if (isUploading) {
      toast.warning("Please wait, class image is still uploading...");
      return;
    }

    if (!serverUrl) {
      setPhotoRequiredError("Class image is required. Please upload an image.");
      return;
    } else {
      setPhotoRequiredError("");
    }

    if (selectedDays.length === 0) {
      setDaysError("Please select at least one schedule day");
      return;
    } else {
      setDaysError("");
    }

    const finalSubmissionData = {
      ...classData,
      image: serverUrl,
      scheduleDays: selectedDays,
      userName: user?.name,
      userEmail: user?.email,
      userRole: user?.role,
      userId: user?.id,
      userImage: user?.image,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/classes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalSubmissionData),
    });

    const data = await res.json();
    if (data.insertedId) {
      toast.success("Class added successfully!");
      formElement.reset();
      setSelectedDays([]);
      handleRemoveImage();
      router.refresh();
    }
  };

  return (
    <div className="w-full min-h-screen dark:bg-neutral-900/40 p-4 md:p-8 flex flex-col items-center">
      <Form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl bg-white dark:bg-neutral-950 border border-gray-200/80 dark:border-neutral-800 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col gap-6"
      >
        {/* Form Header */}
        <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100 dark:border-neutral-900">
          <div className="p-1.5 bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400 rounded-lg">
            <RxPlus className="size-4 font-bold" />
          </div>
          <h2 className="text-base font-bold text-slate-800 dark:text-white tracking-tight">
            Add New Class
          </h2>
        </div>

        <Fieldset className="w-full flex flex-col gap-5">
          <Fieldset.Legend className="sr-only">
            Class Details Settings
          </Fieldset.Legend>

          <FieldGroup className="w-full flex flex-col gap-5">
            {/* Class Name */}
            <TextField
              isRequired
              name="name"
              type="text"
              className="w-full flex flex-col gap-1.5"
              validate={(value) => {
                if (value.length < 3) {
                  return "Name must be at least 3 characters";
                }
                return null;
              }}
            >
              <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                Class Name
              </Label>
              <Input
                placeholder="e.g. Power Yoga Flow"
                className="w-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl px-4 py-2 text-sm focus-within:border-green-500 transition-all"
              />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            {/* Class Image Upload Field */}
            <TextField isRequired className="w-full flex flex-col gap-1.5">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                Class Image
              </Label>

              {/* Hidden Native File Input */}
              <input
                ref={fileInputRef}
                onChange={(e) => {
                  handleImageChange(e);
                  setPhotoRequiredError("");
                }}
                type="file"
                className="hidden"
                accept="image/*"
              />

              <div className="flex flex-col gap-3">
                {/* Custom File Upload Button */}
                <Button
                  variant="outline"
                  type="button"
                  className="w-full h-11 rounded-xl text-zinc-500 dark:text-zinc-400 border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-900/60 transition-all text-sm flex items-center justify-between px-4 cursor-pointer"
                  onPress={handleBtnPress}
                >
                  <span className="text-sm font-normal">
                    {isUploading
                      ? "Uploading Image..."
                      : serverUrl
                        ? "Image Selected ✓"
                        : "Upload Photo"}
                  </span>
                  <MdDriveFolderUpload className="text-xl text-gray-400" />
                </Button>

                {/* Image Preview Panel */}
                {previewUrl && (
                  <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-800 bg-gray-50/50 dark:bg-zinc-950 flex items-center justify-center">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      height={30}
                      width={30}
                      unoptimized
                      className="h-full w-auto object-contain rounded-xl"
                    />
                    {/* Image Remove Button */}
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

              {/* Image Validation Error Message */}
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

            {/* Category & Difficulty Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              {/* Category */}
              <Select
                className="w-full flex flex-col gap-1.5"
                placeholder="Select one"
                isRequired
                name="category"
              >
                <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                  Category
                </Label>
                <Select.Trigger className="w-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl px-4 py-2 flex items-center justify-between text-sm focus-within:border-green-500 transition-all">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-md mt-1">
                  <ListBox className="p-1">
                    {categories.map((category, index) => (
                      <ListBox.Item
                        key={index}
                        id={category.value}
                        textValue={category.label}
                        className="px-3 py-1.5 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-900 text-gray-700 dark:text-neutral-300 cursor-pointer flex justify-between items-center"
                      >
                        {category.label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Difficulty Level */}
              <Select
                className="w-full flex flex-col gap-1.5"
                placeholder="Select one"
                isRequired
                name="difficulty"
              >
                <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                  Difficulty Level
                </Label>
                <Select.Trigger className="w-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl px-4 py-2 flex items-center justify-between text-sm focus-within:border-green-500 transition-all">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-md mt-1">
                  <ListBox className="p-1">
                    <ListBox.Item
                      id="beginner"
                      textValue="Beginner"
                      className="px-3 py-1.5 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-900 text-gray-700 dark:text-neutral-300 cursor-pointer flex justify-between items-center"
                    >
                      Beginner
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      id="intermediate"
                      textValue="Intermediate"
                      className="px-3 py-1.5 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-900 text-gray-700 dark:text-neutral-300 cursor-pointer flex justify-between items-center"
                    >
                      Intermediate
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      id="advanced"
                      textValue="Advanced"
                      className="px-3 py-1.5 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-900 text-gray-700 dark:text-neutral-300 cursor-pointer flex justify-between items-center"
                    >
                      Advanced
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* DURATION & PRICE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              {/* Duration */}
              <TextField
                isRequired
                name="duration"
                className="w-full flex flex-col gap-1.5"
                validate={(value) => {
                  if (value.length < 1) {
                    return "Duration is required";
                  }
                  return null;
                }}
              >
                <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                  Duration
                </Label>
                <Input
                  type="number"
                  placeholder="e.g. 60 mins"
                  className="w-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl px-4 py-2 text-sm focus-within:border-green-500 transition-all"
                />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>

              {/* Price */}
              <TextField
                isRequired
                name="price"
                className="w-full flex flex-col gap-1.5"
                validate={(value) => {
                  if (value.length < 1) {
                    return "Price is required";
                  }
                  return null;
                }}
              >
                <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                  Price ($)
                </Label>
                <Input
                  type="number"
                  placeholder="25"
                  className="w-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl px-4 py-2 text-sm focus-within:border-green-500 transition-all"
                />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>
            </div>

            {/* Class Schedule Days */}
            <div className="w-full flex flex-col gap-2">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                Class Schedule Days <span className="text-red-500">*</span>
              </Label>

              {/* Days of the Week */}
              <div
                className={`flex flex-wrap gap-2 p-2.5 rounded-xl transition-all duration-200 ${
                  daysError
                    ? "border border-red-500 bg-red-50/40 dark:bg-red-950/10"
                    : "border border-transparent"
                }`}
              >
                {daysOfWeek.map((day) => {
                  const isSelected = selectedDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-3.5 py-1 text-xs font-medium rounded-full border transition-all duration-200 cursor-pointer select-none active:scale-95 ${
                        isSelected
                          ? "bg-green-600 border-green-600 text-white shadow-xs font-semibold"
                          : "bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 text-gray-500 dark:text-neutral-400 hover:border-gray-300 dark:hover:border-neutral-700"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Real-Time Custom Error Message Display */}
              {daysError && (
                <p className="text-xs text-red-500 mt-0.5 font-medium animate-pulse">
                  {daysError}
                </p>
              )}
            </div>

            {/* Class Time */}
            <FieldGroup className="w-full flex flex-col gap-1.5">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                Time
              </Label>
              <div className="w-full">
                <TextField
                  isRequired
                  name="startTime"
                  type="time"
                  className="w-full"
                >
                  <Label className="sr-only">Start Time</Label>
                  <Input className="w-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl px-4 py-2 text-sm text-gray-700 dark:text-neutral-200 focus-within:border-green-500 transition-all" />
                  <FieldError className="text-xs text-red-500 mt-1" />
                </TextField>
              </div>
            </FieldGroup>

            {/* Description */}
            <TextField
              isRequired
              name="description"
              className="w-full flex flex-col gap-1.5"
              validate={(value) => {
                if (value.length < 10) {
                  return "Description must be at least 10 characters";
                }
                return null;
              }}
            >
              <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                Description
              </Label>
              <TextArea
                placeholder="Describe your class..."
                className="w-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl px-4 py-2 text-sm min-h-25 focus-within:border-green-500 transition-all"
              />
              <Description className="text-[10px] text-gray-400 dark:text-neutral-500">
                Minimum 10 characters
              </Description>
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>
          </FieldGroup>

          {/* Action Buttons */}
          <Fieldset.Actions className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-neutral-900 justify-start">
            <Button
              type="submit"
              disabled={isUploading}
              className="text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all duration-200 active:scale-95 cursor-pointer bg-[#72c113] hover:bg-[#63aa10] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FloppyDisk className="size-3.5" />
              {isUploading ? "Uploading..." : "Save changes"}
            </Button>
            <Button
              type="reset"
              variant="secondary"
              onPress={() => setDaysError("")}
              className="bg-gray-100 dark:bg-neutral-900 text-gray-600 dark:text-neutral-400 font-bold px-5 py-2.5 rounded-xl text-xs transition-all hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer"
            >
              Cancel
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>
    </div>
  );
};

export default AddClassForm;
