import { cookies } from "next/headers";

import LoginForm from "@/components/login-form";
import { redirect } from "next/navigation";



export default async function Home() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

   if (sessionCookie) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
