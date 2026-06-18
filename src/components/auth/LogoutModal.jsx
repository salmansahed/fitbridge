"use client";

import { authClient } from "@/lib/auth-client";
import { Button, AlertDialog } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { toast } from "react-toastify";

const LogoutModal = () => {
  const router = useRouter();

  const handleLogoutBtn = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully!", {
      position: "top-center",
    });
    router.refresh();
    router.push("/");
  };
  return (
    <div>
      <AlertDialog>
        <Button
          variant="outline"
          className="font-bold rounded-md hover:rounded-3xl hover:bg-danger hover:text-white shadow-xs active:scale-98 text-danger transition-all duration-300 border border-danger hover:border-danger w-full"
        >
          Logout
          <FiLogOut />
        </Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-100">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <RiLogoutCircleRLine className="text-4xl bg-red-200 text-red-600 p-2 rounded-full" />
                <AlertDialog.Heading>Logout?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>Are you sure you want to logout?</p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button
                  slot="close"
                  variant="danger-soft"
                  className=" rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  slot="close"
                  variant="danger"
                  onClick={handleLogoutBtn}
                  className=" rounded-xl"
                >
                  Logout
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default LogoutModal;
