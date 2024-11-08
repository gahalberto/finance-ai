import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Home = async () => {
  // Get UserId from Clerk
  const { userId } = await auth();

  // Redirect if there is no User Logged
  if (!userId) redirect("/login");

  return (
    <div className="flex h-full items-center justify-center">
      <UserButton showName />
    </div>
  );
};

export default Home;
