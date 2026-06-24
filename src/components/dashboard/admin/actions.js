"use server";

import { revalidatePath } from "next/cache";

// user role update server action
export async function updateUserRole(userId, newRole) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      },
    );

    const data = await res.json();

    if (data.success) {
      revalidatePath("/dashboard/manage-users");
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    console.error("Failed to update role:", error);
    return { success: false };
  }
}

// user status toggle server action
export async function toggleUserStatus(userId, currentStatus) {
  const newStatus = currentStatus === "active" ? "blocked" : "active";

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      },
    );

    const data = await res.json();

    if (data.success) {
      revalidatePath("/dashboard/manage-users");
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    console.error("Failed to toggle status:", error);
    return { success: false };
  }
}
