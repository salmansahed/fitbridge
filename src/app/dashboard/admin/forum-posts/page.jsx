import ForumPostsTableClient from "@/components/dashboard/admin/ForumPostsTableClient";

const AdminForumPostsPage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/forum-posts-for-admin`,
    {
      cache: "no-store",
    },
  );
  const data = await res.json();

  const initialPosts = data.success ? data.data : [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-slate-800 dark:text-zinc-100 mb-8 tracking-tight">
        Forum Posts
      </h1>

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
