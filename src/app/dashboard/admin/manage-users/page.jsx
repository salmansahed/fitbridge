import React from "react";
import { Button, Chip, Table } from "@heroui/react";
import Image from "next/image";
import ActionButtons from "@/components/dashboard/admin/ActionButtons";

const ManageUsersPage = async () => {
  const userRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
    cache: "no-store",
  });
  const { users } = await userRes.json();

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <Table className="max-h-screen overflow-y-auto scrollbar-thin">
        <Table.ScrollContainer>
          <Table.Content aria-label="Team members">
            <Table.Header>
              <Table.Column isRowHeader>User</Table.Column>
              <Table.Column>Role</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {users.map((user) => (
                <Table.Row key={user._id}>
                  {/* User Column */}
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-xl object-cover border border-neutral-200 shadow-sm"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-800">
                          {user.name}
                        </span>
                        <span className="text-xs text-slate-400">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </Table.Cell>

                  {/* Role Chip */}
                  <Table.Cell className="capitalize">
                    <Chip
                      className={`${
                        user.role === "admin"
                          ? "bg-green-500/10 text-green-600"
                          : user.role === "trainer"
                            ? "bg-yellow-500/10 text-yellow-600"
                            : "bg-gray-500/10 text-gray-600"
                      } rounded-md px-2 py-0.5 text-xs font-semibold`}
                    >
                      {user.role}
                    </Chip>
                  </Table.Cell>

                  {/* Status Chip */}
                  <Table.Cell className="capitalize">
                    <Chip
                      className={`${
                        user.status === "active"
                          ? "bg-green-500/10 text-green-600"
                          : "bg-red-500/10 text-red-600"
                      } rounded-md px-2 py-0.5 text-xs font-semibold`}
                    >
                      {user.status}
                    </Chip>
                  </Table.Cell>

                  {/* Action Buttons Column */}
                  <Table.Cell>
                    {user.role === "admin" ? (
                      <Button
                        size="sm"
                        isDisabled
                        className="rounded-md bg-blue-500/10 text-blue-500 border border-blue-200"
                      >
                        No action for Admin
                      </Button>
                    ) : (
                      // Client component where we pass the ID and current status
                      <ActionButtons
                        userId={user._id}
                        currentStatus={user.status}
                      />
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default ManageUsersPage;
