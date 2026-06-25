"use client";

import React, { useState } from "react";
import { Table, Button, AlertDialog } from "@heroui/react";
import { toast } from "react-toastify";
import Image from "next/image";

// Receiving initialTrainers data as props from the server page
export default function TrainerTableClient({ initialTrainers }) {
  // Storing server data in client state for instant UI updates after demotion
  const [trainers, setTrainers] = useState(initialTrainers || []);
  const [loadingId, setLoadingId] = useState(null); // Tracking loading state for specific user button

  // Main function to handle trainer demotion
  const handleDemote = async (trainerId, trainerEmail) => {
    setLoadingId(trainerId); // Set loading state for the clicked button only
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/trainers/demote/${trainerId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trainerEmail }),
        },
      );
      const data = await res.json();

      if (data.success) {
        toast.success("Trainer successfully demoted to user!");
        // Update UI by removing the demoted trainer from the list
        setTrainers((prev) => prev.filter((t) => t._id !== trainerId));
      } else {
        toast.error(data.message || "Failed to demote trainer");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2">
      <Table className="max-h-screen overflow-y-auto scrollbar-thin">
        <Table.ScrollContainer>
          <Table.Content aria-label="Manage Trainers Table">
            <Table.Header>
              <Table.Column isRowHeader>TRAINER</Table.Column>
              <Table.Column>EMAIL</Table.Column>
              <Table.Column>ACTION</Table.Column>
            </Table.Header>

            <Table.Body>
              {trainers.map((trainer) => (
                <Table.Row
                  key={trainer._id}
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
                >
                  <Table.Cell>
                    <div className="flex items-center gap-3 py-2">
                      <Image
                        src={
                          trainer?.image ||
                          trainer?.photoURL ||
                          "https://via.placeholder.com/150"
                        }
                        alt="Trainer"
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
                        width={40}
                        height={40}
                      />
                      <span className="font-semibold text-slate-700">
                        {trainer.name}
                      </span>
                    </div>
                  </Table.Cell>

                  <Table.Cell className="text-slate-500 font-medium text-sm">
                    {trainer.email}
                  </Table.Cell>

                  <Table.Cell>
                    {/* Implementing the AlertDialog for demotion confirmation */}
                    <AlertDialog>
                      {/* This button triggers the dialog */}
                      <Button
                        variant="flat"
                        size="sm"
                        className="font-semibold bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 transition-all rounded-lg"
                        isLoading={loadingId === trainer._id}
                      >
                        Demote to User
                      </Button>

                      <AlertDialog.Backdrop>
                        <AlertDialog.Container>
                          <AlertDialog.Dialog className="sm:max-w-100">
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header>
                              <AlertDialog.Icon status="danger" />
                              <AlertDialog.Heading>
                                Demote {trainer.name}?
                              </AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                              <p className="text-sm text-slate-600">
                                This will permanently demote{" "}
                                <strong>{trainer.name}</strong> to a regular
                                user and remove their trainer privileges. This
                                action cannot be undone.
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
                              {/* slot="close" automatically closes the dialog on click */}
                              <Button
                                slot="close"
                                variant="danger"
                                className="rounded-md hover:rounded-3xl transition-all duration-300"
                                onClick={() =>
                                  handleDemote(trainer._id, trainer.email)
                                }
                              >
                                Yes, Demote
                              </Button>
                            </AlertDialog.Footer>
                          </AlertDialog.Dialog>
                        </AlertDialog.Container>
                      </AlertDialog.Backdrop>
                    </AlertDialog>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
