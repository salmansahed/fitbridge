export const metadata = {
  title: "Manage Users",
};

import React from "react";
import { Button, Chip, Table } from "@heroui/react";
import Image from "next/image";
import ActionButtons from "@/components/dashboard/admin/ActionButtons";
import { LuInbox } from "react-icons/lu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ManageUsersPage = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const userRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const { users } = await userRes.json();

  return (
    <div className="px-6 min-h-screen">
      <div className="mb-6 shadow-sm rounded-xl p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700">
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white mb-2">
          Manage Users
        </h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400">
          Here you can manage all the users of the platform. You can promote
          users to admin, block or unblock them as needed.
        </p>
        {/* Total Users */}
        <p className="mt-4">
          <span className="text-sm text-slate-600 dark:text-zinc-400">
            Total Users:{" "}
            <span className="font-semibold text-xl text-green-500 sm:text-2xl dark:text-green-400">
              {users.length}
            </span>
          </span>
        </p>
      </div>
      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center my-10 py-16 px-6 bg-white dark:bg-zinc-900 border border-dashed border-slate-300 dark:border-zinc-700 rounded-2xl shadow-sm text-center w-full">
          <div className="w-16 h-16 bg-slate-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-5 border border-slate-100 dark:border-zinc-700/50">
            <LuInbox className="w-8 h-8 text-slate-400 dark:text-zinc-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
            No Users Found
          </h3>
          <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
            There are currently no registered users in the system.
          </p>
        </div>
      ) : (
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
                          <span className="text-sm font-semibold text-slate-800 dark:text-white">
                            {user.name}
                          </span>
                          <span className="text-xs text-slate-400 dark:text-zinc-400">
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
      )}
    </div>
  );
};

export default ManageUsersPage;
