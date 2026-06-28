"use client";

import { AlertDialog, Button } from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const DeleteForumPostModal = ({ postData }) => {
  const { _id, title } = postData;

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    const { data: tokenData } = await authClient.token();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/forum-posts/${_id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Forum post deleted successfully!", {
          position: "top-center",
        });
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(data.message || "Failed to delete the forum post.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Something went wrong! Please try again.", {
        position: "top-center",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <Button
        onPress={() => setIsOpen(true)}
        className="px-4 py-1.5 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/60 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs"
      >
        Delete
      </Button>

      <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-100 bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-900">
              <AlertDialog.CloseTrigger />

              <AlertDialog.Header className="flex items-center gap-3">
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading className="text-base font-bold text-slate-800 dark:text-white">
                  Delete Forum Post Permanently?
                </AlertDialog.Heading>
              </AlertDialog.Header>

              <AlertDialog.Body className="py-2">
                <p className="text-sm text-gray-500 dark:text-neutral-400 leading-relaxed">
                  Are you sure you want to permanently delete{" "}
                  <strong className="text-slate-800 dark:text-white">
                    {title}
                  </strong>
                  ? This action cannot be undone.
                </p>
              </AlertDialog.Body>

              <AlertDialog.Footer className="flex items-center gap-3 justify-end pt-4">
                {/* Cancel Button */}
                <Button
                  onPress={() => setIsOpen(false)}
                  className="bg-gray-100 dark:bg-neutral-900 text-gray-600 dark:text-neutral-400 font-bold px-4 py-2 rounded-xl text-xs transition-all hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  Cancel
                </Button>

                {/* Delete Confirmation Button */}
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isDeleting ? "Deleting..." : "Delete Post"}
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default DeleteForumPostModal;
