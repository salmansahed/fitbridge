import ForumPostsTableClient from "@/components/dashboard/admin/ForumPostsTableClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const AdminForumPostsPage = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/forum-posts-for-admin`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await res.json();

  const initialPosts = data.success ? data.data : [];

  return (
    <div className="p-6">
      <div className="mb-6 shadow-sm rounded-xl p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700">
        <h1 className="text-2xl sm:text-3xl font-extrabold dark:text-white mb-1">
          Forum Posts
        </h1>
        <p className="font-medium text-slate-500">
          Total Posts:{" "}
          <span className="font-bold text-xl sm:text-2xl text-[#84cc16]">
            {initialPosts.length}
          </span>
        </p>
      </div>

      {initialPosts.length > 0 ? (
        <ForumPostsTableClient initialPosts={initialPosts} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-sm">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-xl font-bold text-slate-700 dark:text-zinc-100">
            No posts found
          </h2>
          <p className="text-slate-500 dark:text-zinc-400 mt-2">
            Currently there are no forum posts to display.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminForumPostsPage;
