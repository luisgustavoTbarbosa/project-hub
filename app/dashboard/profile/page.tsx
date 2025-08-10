import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    redirect("/");
  }

  try {
    return <h1>profile page</h1>;
  } catch {
    return <p>Sessão inválida. Faça login novamente.</p>;
  }
}
