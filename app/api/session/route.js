import { adminAuth } from "@/lib/firebase/adminApp";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const { idToken } = await request.json();

    // Valida o token recebido
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    // Cria um cookie seguro (24h)
    const expiresIn = 60 * 60 * 24 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    cookies().set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expiresIn / 1000,
      path: "/",
    });

    return new Response(JSON.stringify({ status: "success" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }
}
