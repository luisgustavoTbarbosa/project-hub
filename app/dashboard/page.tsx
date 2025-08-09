import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/adminApp";

export default async function DashboardPage() {
  const cookieStore = await cookies(); // await aqui!
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    return <p>Acesso negado. Faça login.</p>;
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    return <h1>Bem-vindo {decodedClaims.email}</h1>;
  } catch {
    return <p>Sessão inválida. Faça login novamente.</p>;
  }
}
