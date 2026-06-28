"use client";

import React, { useState } from "react";
import { Table, Button, AlertDialog } from "@heroui/react";
import { toast } from "react-toastify";
import Image from "next/image";
import userAvatar from "../../../assets/images/useravatar.png";
import { authClient } from "@/lib/auth-client";

export default function ClassTableClient({ initialClasses }) {
  const [classes, setClasses] = useState(initialClasses || []);
  const [loadingId, setLoadingId] = useState(null);

  // Approve a class and update UI state
  const handleApproveClass = async (classId) => {
    const { data: tokenData } = await authClient.token();

    setLoadingId(classId);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/classes/approve/${classId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );
      const data = await res.json();

      if (data.success) {
        toast.success("Class has been approved successfully", {
          position: "top-center",
        });
        setClasses((prev) =>
          prev.map((c) =>
            c._id === classId ? { ...c, status: "approved" } : c,
          ),
        );
      } else {
        toast.error(data.message || "Failed to approve class");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoadingId(null);
    }
  };

  // Reject a class and update UI state
  const handleRejectClass = async (classId) => {
    const { data: tokenData } = await authClient.token();

    setLoadingId(classId);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/classes/reject/${classId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );
      const data = await res.json();

      if (data.success) {
        toast.success("Class has been rejected successfully", {
          position: "top-center",
        });
        setClasses((prev) =>
          prev.map((c) =>
            c._id === classId ? { ...c, status: "rejected" } : c,
          ),
        );
      } else {
        toast.error(data.message || "Failed to reject class");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoadingId(null);
    }
  };

  // Permanently delete a class from database and update UI
  const handleDeleteClass = async (classId) => {
    const { data: tokenData } = await authClient.token();

    setLoadingId(classId);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/classes/${classId}`,
        {
          method: "DELETE",
          headers: { authorization: `Bearer ${tokenData?.token}` },
        },
      );
      const data = await res.json();

      if (res.ok && (data.success || data.deletedCount > 0)) {
        toast.success("Class has been deleted permanently", {
          position: "top-center",
        });
        setClasses((prev) => prev.filter((c) => c._id !== classId));
      } else {
        toast.error(data.message || "Failed to delete class", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Frontend Delete Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 p-2">
      <Table className="max-h-screen overflow-y-auto scrollbar-thin">
        <Table.ScrollContainer>
          <Table.Content aria-label="Manage Classes Table">
            <Table.Header>
              <Table.Column isRowHeader>CLASS DETAILS</Table.Column>
              <Table.Column>TRAINER INFO</Table.Column>
              <Table.Column>STATUS</Table.Column>
              <Table.Column>PRICE</Table.Column>
              <Table.Column>ACTIONS</Table.Column>
            </Table.Header>

            <Table.Body>
              {classes.map((singleClass) => {
                const currentStatus = singleClass?.status || "pending";
                const formattedStatus =
                  typeof currentStatus === "string"
                    ? currentStatus.charAt(0).toUpperCase() +
                      currentStatus.slice(1)
                    : "Pending";

                return (
                  <Table.Row
                    key={singleClass._id}
                    className="border-b border-slate-50 dark:border-zinc-800 last:border-0 hover:bg-slate-50/50 dark:hover:bg-zinc-800/50 transition-colors"
                  >
                    <Table.Cell>
                      <div className="flex items-center gap-3 py-2">
                        <Image
                          src={singleClass?.image || userAvatar}
                          alt="Class Preview"
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-zinc-700 shadow-sm"
                          width={48}
                          height={48}
                        />
                        <span
                          className="font-semibold text-slate-700 dark:text-zinc-200"
                          title={singleClass.name}
                        >
                          {singleClass.name.length > 15
                            ? `${singleClass.name.substring(0, 15)}...`
                            : singleClass.name}
                        </span>
                      </div>
                    </Table.Cell>

                    <Table.Cell className="text-slate-600 dark:text-zinc-300 font-medium text-sm">
                      <div>
                        {singleClass.trainerName ||
                          singleClass.userName ||
                          "Unknown Trainer"}
                      </div>
                      <div className="text-xs text-slate-400 dark:text-zinc-500 font-normal mt-0.5">
                        {singleClass.category}
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          currentStatus === "approved"
                            ? "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-900/50"
                            : currentStatus === "rejected"
                              ? "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50"
                              : "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50"
                        }`}
                      >
                        {formattedStatus}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="text-slate-700 dark:text-zinc-200 font-bold text-sm">
                      ${singleClass.price}
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        {/* Toggle button logic: Reject if approved, else Approve */}
                        {currentStatus === "approved" ? (
                          <AlertDialog>
                            <Button
                              variant="flat"
                              size="sm"
                              className="font-semibold bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/40 border border-red-100 dark:border-red-900/30 transition-all rounded-md hover:rounded-3xl duration-300"
                            >
                              Reject
                            </Button>
                            <AlertDialog.Backdrop>
                              <AlertDialog.Container>
                                <AlertDialog.Dialog className="sm:max-w-100">
                                  <AlertDialog.CloseTrigger />
                                  <AlertDialog.Header>
                                    <AlertDialog.Icon status="danger" />
                                    <AlertDialog.Heading>
                                      Reject Class Application?
                                    </AlertDialog.Heading>
                                  </AlertDialog.Header>
                                  <AlertDialog.Body>
                                    <p className="text-sm text-slate-600 dark:text-zinc-300">
                                      Are you sure you want to reject{" "}
                                      <strong>{singleClass.name}</strong>?
                                    </p>
                                  </AlertDialog.Body>
                                  <AlertDialog.Footer>
                                    <Button
                                      slot="close"
                                      variant="outline"
                                      className="rounded-md hover:rounded-3xl transition-all duration-300"
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      slot="close"
                                      className="rounded-md hover:rounded-3xl transition-all duration-300 bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 border border-red-200 dark:border-red-900/50"
                                      isLoading={loadingId === singleClass._id}
                                      onClick={() =>
                                        handleRejectClass(singleClass._id)
                                      }
                                    >
                                      Yes, Reject
                                    </Button>
                                  </AlertDialog.Footer>
                                </AlertDialog.Dialog>
                              </AlertDialog.Container>
                            </AlertDialog.Backdrop>
                          </AlertDialog>
                        ) : (
                          <AlertDialog>
                            <Button
                              size="sm"
                              className="font-semibold bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-950/40 border border-green-200 dark:border-green-900/30 transition-all rounded-md hover:rounded-3xl duration-300"
                            >
                              Approve
                            </Button>
                            <AlertDialog.Backdrop>
                              <AlertDialog.Container>
                                <AlertDialog.Dialog className="sm:max-w-100">
                                  <AlertDialog.CloseTrigger />
                                  <AlertDialog.Header>
                                    <AlertDialog.Icon status="success" />
                                    <AlertDialog.Heading>
                                      Approve Class Application?
                                    </AlertDialog.Heading>
                                  </AlertDialog.Header>
                                  <AlertDialog.Body>
                                    <p className="text-sm text-slate-600 dark:text-zinc-300">
                                      Are you sure you want to approve{" "}
                                      <strong>{singleClass.name}</strong>?
                                    </p>
                                  </AlertDialog.Body>
                                  <AlertDialog.Footer>
                                    <Button
                                      slot="close"
                                      variant="outline"
                                      className="rounded-md hover:rounded-3xl transition-all duration-300"
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      slot="close"
                                      className="rounded-md hover:rounded-3xl transition-all duration-300 bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 hover:bg-green-100 border border-green-200 dark:border-green-900/50"
                                      isLoading={loadingId === singleClass._id}
                                      onClick={() =>
                                        handleApproveClass(singleClass._id)
                                      }
                                    >
                                      Yes, Approve
                                    </Button>
                                  </AlertDialog.Footer>
                                </AlertDialog.Dialog>
                              </AlertDialog.Container>
                            </AlertDialog.Backdrop>
                          </AlertDialog>
                        )}

                        <AlertDialog>
                          <Button
                            variant="danger-soft"
                            size="sm"
                            className="font-semibold hover:bg-red-100 dark:hover:bg-red-950/30 border border-red-200 dark:border-red-900/50 transition-all rounded-md hover:rounded-3xl duration-300"
                          >
                            Delete
                          </Button>
                          <AlertDialog.Backdrop>
                            <AlertDialog.Container>
                              <AlertDialog.Dialog className="sm:max-w-100">
                                <AlertDialog.CloseTrigger />
                                <AlertDialog.Header>
                                  <AlertDialog.Icon status="danger" />
                                  <AlertDialog.Heading>
                                    Delete Class Permanently?
                                  </AlertDialog.Heading>
                                </AlertDialog.Header>
                                <AlertDialog.Body>
                                  <p className="text-sm text-slate-600 dark:text-zinc-300">
                                    This action is irreversible. Delete{" "}
                                    <strong>{singleClass.name}</strong>?
                                  </p>
                                </AlertDialog.Body>
                                <AlertDialog.Footer>
                                  <Button
                                    slot="close"
                                    variant="outline"
                                    className="rounded-md hover:rounded-3xl transition-all duration-300"
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    slot="close"
                                    variant="danger"
                                    className="rounded-md hover:rounded-3xl transition-all duration-300"
                                    isLoading={loadingId === singleClass._id}
                                    onClick={() =>
                                      handleDeleteClass(singleClass._id)
                                    }
                                  >
                                    Confirm Delete
                                  </Button>
                                </AlertDialog.Footer>
                              </AlertDialog.Dialog>
                            </AlertDialog.Container>
                          </AlertDialog.Backdrop>
                        </AlertDialog>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
