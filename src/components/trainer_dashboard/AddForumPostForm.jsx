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
} from "@heroui/react";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { MdDeleteForever, MdDriveFolderUpload } from "react-icons/md";
import useImageUpload from "@/lib/image-upload/useImageUpload";
import { useRouter } from "next/navigation";

const AddForumPostForm = ({ user }) => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [photoRequiredError, setPhotoRequiredError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const postData = Object.fromEntries(formData.entries());

    if (isUploading) {
      toast.warning("Please wait, post image is still uploading...");
      return;
    }

    if (!serverUrl) {
      setPhotoRequiredError("Post image is required. Please upload an image.");
      return;
    } else {
      setPhotoRequiredError("");
    }

    const finalSubmissionData = {
      ...postData,
      image: serverUrl,
      userEmail: user?.email,
      userName: user?.name,
      userId: user?.id,
      userImage: user?.image,
      userRole: user?.role,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/forum-post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalSubmissionData),
        },
      );

      const data = await res.json();
      if (data.insertedId) {
        toast.success("Forum post added successfully!");
        formElement.reset();
        handleRemoveImage();
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen dark:bg-neutral-900/40 p-4 md:p-8 flex flex-col items-center">
      <Form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white dark:bg-neutral-950 border border-gray-200/80 dark:border-neutral-800 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col gap-6"
      >
        <Fieldset className="w-full flex flex-col gap-5">
          <Fieldset.Legend className="text-lg font-bold text-slate-800 dark:text-white tracking-tight pb-2 border-b border-gray-100 dark:border-neutral-900 w-full">
            Create Forum Post
          </Fieldset.Legend>
          <Description className="text-sm text-gray-400 dark:text-neutral-500 -mt-2">
            Share your knowledge or ask a question to the community.
          </Description>

          <FieldGroup className="w-full flex flex-col gap-5">
            {/* Post Title */}
            <TextField
              isRequired
              name="title"
              className="w-full flex flex-col gap-1.5"
              validate={(value) => {
                if (value.length < 5) {
                  return "Title must be at least 5 characters";
                }
                return null;
              }}
            >
              <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                Title
              </Label>
              <Input
                placeholder="e.g. 5 Essential Yoga Poses for Beginners"
                className="w-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl px-4 py-2 text-sm focus-within:border-green-500 transition-all"
              />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            {/* Post Image */}
            <TextField isRequired className="w-full flex flex-col gap-1.5">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                Post Image
              </Label>

              {/* Hidden File Input */}
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
                {/* Upload Button */}
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
                        : "Upload Cover Photo"}
                  </span>
                  <MdDriveFolderUpload className="text-xl text-gray-400" />
                </Button>

                {/* Image Preview */}
                {previewUrl && (
                  <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-800 bg-gray-50/50 dark:bg-zinc-950 flex items-center justify-center">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      unoptimized
                      fill
                      className="object-contain rounded-xl"
                    />
                    {/* Image Remove Button */}
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-3 right-3 bg-rose-600 hover:bg-rose-700 text-white p-2 text-xs font-medium rounded-xl transition-colors shadow-lg cursor-pointer z-10"
                    >
                      <MdDeleteForever className="text-xl" />
                    </button>
                  </div>
                )}
              </div>

              {/* Image Validation and Record Message */}
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

            {/* Post Content */}
            <TextField
              isRequired
              name="content"
              className="w-full flex flex-col gap-1.5"
              validate={(value) => {
                if (value.length < 20) {
                  return "Content must be at least 20 characters";
                }
                return null;
              }}
            >
              <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                Content
              </Label>
              <TextArea
                placeholder="Write your post content here..."
                className="w-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl px-4 py-2 text-sm min-h-32 focus-within:border-green-500 transition-all"
              />
              <Description className="text-[10px] text-gray-400 dark:text-neutral-500">
                Minimum 20 characters
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
              {isUploading ? "Uploading..." : "Publish Post"}
            </Button>
            <Button
              type="reset"
              variant="secondary"
              onPress={handleRemoveImage}
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

export default AddForumPostForm;
