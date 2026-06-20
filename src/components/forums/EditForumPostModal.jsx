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
  Modal,
} from "@heroui/react";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import useImageUpload from "@/lib/image-upload/useImageUpload";
import { MdDeleteForever, MdDriveFolderUpload } from "react-icons/md";
import { useRouter } from "next/navigation";
import { BiEditAlt } from "react-icons/bi";

const EditForumPostModal = ({ postData }) => {
  const {
    _id,
    title,
    content,
    image: currentImage,
    ...restPostData
  } = postData || {};

  const router = useRouter();

  const [photoRequiredError, setPhotoRequiredError] = useState("");
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

  const handleBtnPress = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const updatedFormFields = Object.fromEntries(formData.entries());

    if (isUploading) {
      toast.warning("Please wait, post image is still uploading...");
      return;
    }

    if (!finalImageUrl) {
      setPhotoRequiredError("Post image is required. Please upload an image.");
      return;
    }

    const finalSubmissionData = {
      ...restPostData, 
      ...updatedFormFields,
      image: finalImageUrl,
    };


    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/forum-posts/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalSubmissionData),
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Forum post updated successfully!");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.info("No changes were made.");
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Update error:", error);
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
          Edit Post
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
                      Edit Forum Post
                    </h2>
                  </div>

                  <Fieldset className="w-full flex flex-col gap-5">
                    <Fieldset.Legend className="sr-only">
                      Forum Post Settings
                    </Fieldset.Legend>

                    <FieldGroup className="w-full flex flex-col gap-5">
                      {/* Post Title (with defaultValue) */}
                      <TextField
                        name="title"
                        type="text"
                        defaultValue={title}
                        className="w-full flex flex-col gap-1.5"
                        validate={(value) => {
                          if (value && value.length < 5) {
                            return "Title must be at least 5 characters";
                          }
                          return null;
                        }}
                      >
                        <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                          Post Title
                        </Label>
                        <Input
                          placeholder="e.g. Tips for MERN Stack Developers"
                          className="w-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl px-4 py-2 text-sm focus-within:border-green-500 transition-all"
                        />
                        <FieldError className="text-xs text-red-500 mt-1" />
                      </TextField>

                      {/* Post Image Upload Field */}
                      <TextField className="w-full flex flex-col gap-1.5">
                        <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                          Post Image
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

                          {/* Image Live Preview Area */}
                          {(previewUrl || finalImageUrl) && (
                            <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-800 bg-gray-50/50 dark:bg-zinc-950 flex items-center justify-center">
                              <Image
                                src={previewUrl || finalImageUrl}
                                alt="Post Preview"
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

                      {/* Post Content (with defaultValue) */}
                      <TextField
                        name="content"
                        defaultValue={content}
                        className="w-full flex flex-col gap-1.5"
                        validate={(value) => {
                          if (value && value.length < 15) {
                            return "Content must be at least 15 characters";
                          }
                          return null;
                        }}
                      >
                        <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                          Post Content
                        </Label>
                        <TextArea
                          placeholder="Write your forum post content here..."
                          className="w-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl px-4 py-2 text-sm min-h-25 focus-within:border-green-500 transition-all"
                        />
                        <Description className="text-[10px] text-gray-400 dark:text-neutral-500">
                          Minimum 15 characters
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
                </Form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default EditForumPostModal;
