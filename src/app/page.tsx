import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { safeVerifySessionToken } from "@/lib/auth";

export default async function Home() {
  const token = (await cookies()).get("qc_session")?.value;
  const session = await safeVerifySessionToken(token);
  redirect(session ? "/dashboard" : "/login");
}
