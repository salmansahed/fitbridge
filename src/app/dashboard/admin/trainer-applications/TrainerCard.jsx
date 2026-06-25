"use client";

import React, { useState } from "react";
import { Button, Chip, Modal, TextArea } from "@heroui/react";
import Image from "next/image";
import { LuBriefcase, LuEye } from "react-icons/lu";
import { IoIosMail } from "react-icons/io";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function TrainerCard({ application }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  // ১. 'Accept Application' Button Handler
  const handleAcceptApplication = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/trainer-applications/accept/${application._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: application.userId }),
        },
      );
      const data = await res.json();

      if (data.success) {
        toast.success("Application accepted, user role and status updated!");
        router.refresh();
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to accept user application!");
    } finally {
      setLoading(false);
    }
  };

  // ২. 'Confirm Rejection' Button Handler
  const handleRejectApplication = async () => {
    if (!rejectionReason) {
      toast.warn("Please provide a rejection reason.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/trainer-applications/reject/${application._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rejectionReason: rejectionReason }),
        },
      );
      const data = await res.json();

      if (data.success) {
        toast.error("Application rejected!");
        router.refresh();
        setRejectionReason("");
        setIsRejecting(false);
      } else {
        toast.error(data.message || "Failed to update status!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to change user application status!");
    } finally {
      setLoading(false);
    }
  };

  // Reset the rejection reason and close the rejection modal
  const handleCancelRejection = () => {
    setRejectionReason("");
    setIsRejecting(false);
  };

  return (
    <div className="max-w-4xl mx-auto my-4 p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Trainer Info */}
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-slate-200/80 shadow-inner shrink-0 bg-slate-100">
          <Image
            src={application?.userImage}
            alt="Trainer Profile"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-base font-bold text-slate-800 tracking-tight capitalize flex items-center gap-1.5">
            {application?.userName?.length > 15
              ? application?.userName?.slice(0, 15) + "..."
              : application?.userName}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <IoIosMail size={13} className="text-slate-400" />
            <span>{application?.userEmail}</span>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <Chip
              size="sm"
              className="bg-green-500/10 text-green-600 border border-green-500/20 rounded-md font-semibold text-[11px] px-1 capitalize"
            >
              {application.specialty}
            </Chip>

            <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-500/5 px-2 py-0.5 rounded-md border border-slate-500/10">
              <LuBriefcase size={11} className="text-slate-400" />
              <span>{application.yearsOfExperience} yrs exp</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-500/5 px-2 py-0.5 rounded-md border border-slate-500/10">
              <span>{application.status} </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons and Modal */}
      <div className="flex items-center justify-end shrink-0">
        <Modal onClose={handleCancelRejection}>
          <Button
            size="md"
            variant="flat"
            className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-semibold text-xs tracking-wide shadow-sm hover:shadow transition-all px-5"
          >
            <LuEye size={16} />
            View Details
          </Button>
          <Modal.Backdrop>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-125 rounded-2xl">
                <Modal.CloseTrigger />

                <Modal.Header className="border-b border-slate-100 pb-3">
                  <Modal.Heading className="text-slate-800 font-bold text-lg">
                    Trainer Application Details
                  </Modal.Heading>
                </Modal.Header>

                <Modal.Body className="py-5 flex flex-col gap-4 text-slate-700">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col gap-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Applicant Info
                    </p>
                    <p className="text-sm font-medium">
                      <strong className="text-slate-800">User Name:</strong>{" "}
                      {application.userName}
                    </p>
                    <p className="text-sm font-medium">
                      <strong className="text-slate-800">User Email:</strong>{" "}
                      {application.userEmail}
                    </p>
                    <p className="text-sm font-medium capitalize">
                      <strong className="text-slate-800">Specialty:</strong>{" "}
                      {application.specialty}
                    </p>
                    <p className="text-sm font-medium">
                      <strong className="text-slate-800">Experience:</strong>{" "}
                      {application.yearsOfExperience} Years
                    </p>
                    <p className="text-sm font-medium flex items-center gap-1.5">
                      <strong className="text-slate-800">Status:</strong>
                      <span className="text-amber-600 bg-amber-50 border border-amber-200 text-xs px-2 py-0.5 rounded-md font-semibold capitalize">
                        {application.status}
                      </span>
                    </p>
                  </div>

                  {/* Rejection Reason */}
                  {/* If a rejection reason exists and is not 'null' or empty, display this box */}
                  {application.rejectionReason &&
                    application.rejectionReason !== "null" && (
                      <div className="bg-red-50 p-3 rounded-xl border border-red-100 flex flex-col gap-1 mt-2">
                        <p className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                          Previous Rejection Reason
                        </p>
                        <p className="text-sm text-red-700 font-medium">
                          {application.rejectionReason}
                        </p>
                      </div>
                    )}

                  <div className="flex flex-col gap-1.5">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Biography / Motivation
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600 bg-white border border-slate-200/60 p-3 rounded-xl italic">
                      &quot;
                      {application.bio ||
                        "No biography provided by the applicant."}
                      &quot;
                    </p>
                  </div>

                  {/* Rejection Reason Textarea */}
                  {isRejecting && (
                    <div className="flex flex-col gap-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100 mt-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Reason for Rejection (Required)
                      </p>
                      <TextArea
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Write why the application is rejected..."
                        className="rounded-xl border border-slate-200"
                      />
                    </div>
                  )}
                </Modal.Body>

                {/* Modal Footer */}
                <Modal.Footer className="border-t border-slate-100 pt-3 gap-2 w-full">
                  {application.status === "trainer" ? (
                    // if the user is already a trainer, disable both buttons and show a message
                    <Button
                      isDisabled
                      className="bg-green-100 text-green-700 font-bold text-sm rounded-xl w-full py-2.5 cursor-not-allowed"
                    >
                      User Is Trainer
                    </Button>
                  ) : application.status === "rejected" ? (
                    // if the application is rejected, disable the reject button but keep the accept button working
                    <>
                      <Button
                        isDisabled
                        color="danger"
                        variant="flat"
                        className="font-semibold text-sm rounded-xl cursor-not-allowed opacity-50"
                      >
                        Rejected
                      </Button>

                      <Button
                        slot="close"
                        isLoading={loading}
                        className="bg-green-600 text-white font-semibold text-sm rounded-xl px-5 grow"
                        onClick={handleAcceptApplication}
                      >
                        Accept Application
                      </Button>
                    </>
                  ) : !isRejecting ? (
                    // if the application is pending (normal state)
                    <>
                      <Button
                        color="danger"
                        variant="light"
                        isLoading={loading}
                        className="font-semibold text-sm rounded-xl"
                        onClick={() => setIsRejecting(true)}
                      >
                        Reject
                      </Button>

                      <Button
                        slot="close"
                        isLoading={loading}
                        className="bg-green-600 text-white font-semibold text-sm rounded-xl px-5"
                        onClick={handleAcceptApplication}
                      >
                        Accept Application
                      </Button>
                    </>
                  ) : (
                    // if the rejection reason is provided, display it
                    <>
                      <Button
                        variant="light"
                        isLoading={loading}
                        className="font-semibold text-sm rounded-xl"
                        onClick={handleCancelRejection}
                      >
                        Cancel
                      </Button>

                      <Button
                        slot="close"
                        isLoading={loading}
                        color="danger"
                        className="font-semibold text-sm rounded-xl px-5"
                        onClick={handleRejectApplication}
                      >
                        Confirm Rejection
                      </Button>
                    </>
                  )}
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </div>
    </div>
  );
}
