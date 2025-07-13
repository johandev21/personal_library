import SignoutButton from "@/features/auth/components/signout-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const userName = session.user.name;
  const userEmail = session.user.email;

  return (
    <div className="py-8 px-16">
      <p>Hello, {userName}</p>
      <p>Your email is: {userEmail}</p>
      <SignoutButton />
    </div>
  );
}
