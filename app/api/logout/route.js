import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("session", { path: "/" });
  return new Response(JSON.stringify({ status: "logged_out" }), { status: 200 });
}
