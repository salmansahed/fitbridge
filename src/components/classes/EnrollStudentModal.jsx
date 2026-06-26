"use client";

import { Button, Modal } from "@heroui/react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";

const EnrollStudentModal = ({ enrolledUsers }) => {
  return (
    <div>
      <Modal>
        <Button className="bg-gray-100 text-black border border-neutral-300 dark:bg-neutral-700 dark:text-white dark:border-neutral-600 hover:bg-gray-200 dark:hover:bg-neutral-600">
          <HiOutlineUserGroup size={18} />
          Enrolled
        </Button>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-90">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-default text-foreground">
                  <HiOutlineUserGroup size={28} />
                </Modal.Icon>
                <Modal.Heading className="text-lg font-semibold">
                  Enrolled Students Email List
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="space-y-2">
                {enrolledUsers.length === 0 ? (
                  <p>No students enrolled yet.</p>
                ) : (
                  enrolledUsers.map((user) => (
                    <div key={user._id} className="flex items-center gap-2">
                      <MdOutlineEmail className="text-neutral-500 dark:text-neutral-200 text-3xl bg-gray-200 dark:bg-neutral-600 rounded-full p-1.5" />
                      <span className="text-base">{user.customerEmail}</span>
                    </div>
                  ))
                )}
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default EnrollStudentModal;
