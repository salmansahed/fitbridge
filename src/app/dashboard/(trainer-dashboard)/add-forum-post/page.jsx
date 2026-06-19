import AddForumPostForm from "@/components/trainer_dashboard/AddForumPostForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const AddForumPostPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  if (!user || (user.role !== "trainer" && user.role !== "admin")) {
    return redirect("/login");
  }
  return (
    <div>
      <AddForumPostForm user={user} />
    </div>
  );
};

export default AddForumPostPage;
