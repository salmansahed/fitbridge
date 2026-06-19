import ForumsPostsCard from "@/components/forums/ForumsPostsCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyPostsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const userId = user?.id;
  if (!user || (user.role !== "trainer" && user.role !== "admin")) {
    return redirect("/login");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/forum-post?userId=${userId}`,
    { cache: "no-store" },
  );
  const posts = await res.json();
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
          My Forum Posts
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
          Here are the forum posts you&apos;ve created. You can view, edit, or
          delete your posts from this dashboard.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {posts.map((post) => (
          <ForumsPostsCard key={post._id} postData={post} />
        ))}
      </div>
    </div>
  );
};

export default MyPostsPage;
