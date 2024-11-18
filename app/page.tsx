import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";

const Home = async () => {
  // Get UserId from Clerk
  const { userId } = await auth();

  // Redirect if there is no User Logged
  if (!userId) redirect("/login");

  return <Navbar />;
};

export default Home;
