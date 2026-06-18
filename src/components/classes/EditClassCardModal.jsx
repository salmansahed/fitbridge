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
  Modal,
} from "@heroui/react";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import useImageUpload from "@/lib/image-upload/useImageUpload";
import { MdDeleteForever, MdDriveFolderUpload } from "react-icons/md";
import { useRouter } from "next/navigation";
import { BiEditAlt } from "react-icons/bi";

const EditClassCardModal = ({ classData }) => {
  const {
    _id,
    image: currentImage,
    name,
    category,
    difficulty,
    duration,
    price,
    startTime,
    scheduleDays,
    userName,
    userEmail,
    userRole,
    userImage,
    description,
    userId: classUserId,
  } = classData;

  const router = useRouter();

  const [selectedDays, setSelectedDays] = useState(scheduleDays || []);
  const [photoRequiredError, setPhotoRequiredError] = useState("");
  const [daysError, setDaysError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const fileInputRef = useRef(null);

  const {
    previewUrl,
    serverUrl,
    isUploading,
    error: imageError,
    handleImageChange,
    handleRemoveImage,
  } = useImageUpload(currentImage);

  const finalImageUrl = serverUrl || previewUrl || currentImage;

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const updatedFormFields = Object.fromEntries(formData.entries());

    if (isUploading) {
      toast.warning("Please wait, class image is still uploading...");
      return;
    }

    if (!finalImageUrl) {
      setPhotoRequiredError("Class image is required. Please upload an image.");
      return;
    }

    if (selectedDays.length === 0) {
      setDaysError("Please select at least one schedule day");
      return;
    }

    const finalSubmissionData = {
      ...updatedFormFields,
      image: finalImageUrl,
      scheduleDays: selectedDays,
      userName,
      userEmail,
      userRole,
      userId: classUserId,
      userImage,
    };

    console.log("Final submission data:", finalSubmissionData);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/classes/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalSubmissionData),
        },
      );

      const data = await res.json();
      console.log("data response ?", data);

      if (data.modifiedCount > 0) {
        toast.success("Class updated successfully!");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.info("No changes were made.");
        setIsOpen(false);
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button
          onPress={() => setIsOpen(true)}
          className="px-4 py-1.5 bg-[#f4f9ed] dark:bg-[#1a2412] hover:bg-[#e9f4dc] dark:hover:bg-[#223218] border border-[#d2ebaf] dark:border-[#38531a] text-[#72c113] text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs"
        >
          Edit
        </Button>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
              <Modal.CloseTrigger />

              <Modal.Body className="p-6">
                <Form
                  onSubmit={handleSubmit}
                  className="w-full bg-white dark:bg-neutral-950 rounded-2xl p-2 flex flex-col gap-6"
                >
                  {/* Form Header */}
                  <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100 dark:border-neutral-900">
                    <div className="p-1.5 bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400 rounded-lg">
                      <BiEditAlt className="size-4 font-bold" />
                    </div>
                    <h2 className="text-base font-bold text-slate-800 dark:text-white tracking-tight">
                      Edit Class Details
                    </h2>
                  </div>

                  <Fieldset className="w-full flex flex-col gap-5">
                    <Fieldset.Legend className="sr-only">
                      Class Details Settings
                    </Fieldset.Legend>

                    <FieldGroup className="w-full flex flex-col gap-5">
                      {/* Class Name (with defaultValue) */}
                      <TextField
                        name="name"
                        type="text"
                        defaultValue={name}
                        className="w-full flex flex-col gap-1.5"
                        validate={(value) => {
                          if (value && value.length < 3) {
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
                      <TextField className="w-full flex flex-col gap-1.5">
                        <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                          Class Image
                        </Label>

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
                          <Button
                            variant="outline"
                            type="button"
                            className="w-full h-11 rounded-xl text-zinc-500 dark:text-zinc-400 border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-900/60 transition-all text-sm flex items-center justify-between px-4 cursor-pointer"
                            onPress={handleBtnPress}
                          >
                            <span className="text-sm font-normal">
                              {isUploading
                                ? "Uploading New Image..."
                                : serverUrl
                                  ? "New Image Selected ✓"
                                  : "Change/Keep Current Photo"}
                            </span>
                            <MdDriveFolderUpload className="text-xl text-gray-400" />
                          </Button>

                          {/* Image Preview */}
                          {(previewUrl || finalImageUrl) && (
                            <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-800 bg-gray-50/50 dark:bg-zinc-950 flex items-center justify-center">
                              <Image
                                src={previewUrl || finalImageUrl}
                                alt="Class Preview"
                                height={150}
                                width={150}
                                unoptimized
                                className="h-full w-full object-cover rounded-xl"
                              />
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
                          name="category"
                          defaultValue={category}
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
                              {categories.map((item, index) => (
                                <ListBox.Item
                                  key={item.value}
                                  id={item.value}
                                  textValue={item.label}
                                  className="px-3 py-1.5 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-900 text-gray-700 dark:text-neutral-300 cursor-pointer flex justify-between items-center"
                                >
                                  {item.label}
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
                          name="difficulty"
                          defaultValue={difficulty}
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
                                Beginner <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item
                                id="intermediate"
                                textValue="Intermediate"
                                className="px-3 py-1.5 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-900 text-gray-700 dark:text-neutral-300 cursor-pointer flex justify-between items-center"
                              >
                                Intermediate <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item
                                id="advanced"
                                textValue="Advanced"
                                className="px-3 py-1.5 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-900 text-gray-700 dark:text-neutral-300 cursor-pointer flex justify-between items-center"
                              >
                                Advanced <ListBox.ItemIndicator />
                              </ListBox.Item>
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      </div>

                      {/* DURATION & PRICE */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        {/* Duration */}
                        <TextField
                          name="duration"
                          defaultValue={duration}
                          className="w-full flex flex-col gap-1.5"
                        >
                          <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                            Duration (mins)
                          </Label>
                          <Input
                            type="number"
                            placeholder="e.g. 60"
                            className="w-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl px-4 py-2 text-sm focus-within:border-green-500 transition-all"
                          />
                          <FieldError className="text-xs text-red-500 mt-1" />
                        </TextField>

                        {/* Price */}
                        <TextField
                          name="price"
                          defaultValue={price}
                          className="w-full flex flex-col gap-1.5"
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
                          Class Schedule Days
                        </Label>

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
                        {daysError && (
                          <p className="text-xs text-red-500 mt-0.5 font-medium">
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
                            name="startTime"
                            type="time"
                            defaultValue={startTime}
                          >
                            <Label className="sr-only">Start Time</Label>
                            <Input className="w-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl px-4 py-2 text-sm text-gray-700 dark:text-neutral-200 focus-within:border-green-500 transition-all" />
                            <FieldError className="text-xs text-red-500 mt-1" />
                          </TextField>
                        </div>
                      </FieldGroup>

                      {/* Description */}
                      <TextField
                        name="description"
                        defaultValue={description}
                        className="w-full flex flex-col gap-1.5"
                        validate={(value) => {
                          if (value && value.length < 10) {
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
                        type="button"
                        variant="secondary"
                        onPress={() => setIsOpen(false)}
                        className="bg-gray-100 dark:bg-neutral-900 text-gray-600 dark:text-neutral-400 font-bold px-5 py-2.5 rounded-xl text-xs transition-all hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer"
                      >
                        Cancel
                      </Button>
                    </Fieldset.Actions>
                  </Fieldset>
                  <Modal.Footer>
                    <Button slot="close" variant="secondary">
                      Cancel
                    </Button>
                    <Button slot="close">Send Message</Button>
                  </Modal.Footer>
                </Form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default EditClassCardModal;
