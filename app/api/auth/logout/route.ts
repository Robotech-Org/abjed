import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { clearTokenCookies } from "@/lib/cookies";

export async function POST() {
  const refreshToken = (await cookies()).get("refreshToken")?.value;

  if (refreshToken) {
    try {
      await fetch(`${process.env.ABJAD_API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
    } catch (error) {
      return NextResponse.json({ error: "network_error" }, { status: 503 });
    }
  }

  await clearTokenCookies();
  return NextResponse.json({ message: "logged_out" });
}
