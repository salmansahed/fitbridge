import { auth } from "@/lib/auth";
import { Button, Table } from "@heroui/react";
import { headers } from "next/headers";
import Link from "next/link";
import { MdLink } from "react-icons/md";
import { RiCalendarLine } from "react-icons/ri";

const bookedClasses = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/subscriptions/user/${userId}`,
  );
  const data = (await res.json()) || [];
  if (data.success === false) {
    return (
      <div className="flex flex-col items-center justify-center p-10 md:p-16 bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/50 rounded-3xl text-center max-w-md mx-auto shadow-xs group transition-all duration-300 hover:border-green-500/30">
        {/* Icon Container */}
        <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 mb-5 relative overflow-hidden group-hover:scale-110 group-hover:text-green-500 dark:group-hover:text-green-400 transition-all duration-300">
          <RiCalendarLine className="text-4xl relative z-10" />
          <div className="absolute inset-0 bg-linear-to-br from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Title and Message */}
        <h3 className="text-lg font-black text-neutral-800 dark:text-white mb-2 tracking-tight">
          No Booked Classes Found
        </h3>
        <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed max-w-xs mb-6">
          You haven&apos;t enrolled in any training slots yet. Start your
          fitness journey by exploring our live sessions!
        </p>

        {/* Action Button */}
        <Link href="/all-classes" className="w-full">
          <Button className="w-full font-bold text-xs text-white bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-md hover:rounded-3xl py-5 transition-all duration-300 shadow-lg shadow-green-600/10">
            Explore All Classes
          </Button>
        </Link>
      </div>
    );
  }
  const subscriptions = data.subscriptions || [];

  return (
    <div>
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-800 dark:text-white flex items-center gap-2">
          My Booked Classes
        </h1>
        <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
          View and manage your enrolled fitness sessions and schedules.
        </p>
      </div>
      <Table className="max-h-screen overflow-y-auto scrollbar-thin">
        <Table.ScrollContainer>
          <Table.Content aria-label="Team members">
            <Table.Header>
              <Table.Column isRowHeader>Class Name</Table.Column>
              <Table.Column>Author</Table.Column>
              <Table.Column>Schedule Days</Table.Column>
              <Table.Column>Start Time</Table.Column>
              <Table.Column>Invoice</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Header>
            <Table.Body>
              {subscriptions.map((subscription) => (
                <Table.Row key={subscription._id}>
                  <Table.Cell>
                    {subscription.className.length > 20
                      ? `${subscription.className.slice(0, 20)}...`
                      : subscription.className}
                  </Table.Cell>
                  <Table.Cell>
                    {subscription.authorName} —{" "}
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                      {subscription.authorRole}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    {subscription.scheduleDays.map((day) => (
                      <span
                        key={day}
                        className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                      >
                        {day}
                      </span>
                    ))}
                  </Table.Cell>
                  <Table.Cell>{subscription.startTime}</Table.Cell>
                  <Table.Cell>
                    <Link
                      target="_blank"
                      href={subscription.invoiceUrl}
                      className="text-blue-500 hover:text-blue-700 inline-flex items-center gap-1"
                    >
                      <span className="flex items-center gap-1">
                        View Receipt <MdLink />
                      </span>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link href={`/class-details/${subscription.classId}`}>
                      <Button className="rounded-md text-xs h-8 hover:rounded-3xl bg-linear-to-r from-green-600 to-blue-600 transition-all duration-300">
                        View Details
                      </Button>
                    </Link>
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

export default bookedClasses;
