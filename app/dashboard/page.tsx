import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/adminApp";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    redirect("/");
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    return <h1>Bem-vindo {decodedClaims.email}</h1>;
  } catch {
    return <p>Sessão inválida. Faça login novamente.</p>;
  }
}
