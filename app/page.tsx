import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { dark } from "@clerk/themes";
import { redirect } from "next/navigation";

const Home = async () => {

  // Get UserId from Clerk
  const { userId } = await auth()

  // Redirect if there is no User Logged
  if (!userId) redirect('/login')

  return (
    <div className="h-full flex items-center justify-center">
      <UserButton showName />
    </div>
  )
}

export default Home;  