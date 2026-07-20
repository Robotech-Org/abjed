import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { setTokenCookies, clearTokenCookies } from "@/lib/cookies";

export async function POST() {
  const refreshToken = (await cookies()).get("refreshToken")?.value;

  if (!refreshToken) {
    await clearTokenCookies();
    return NextResponse.json({ error: "no_refresh_token" }, { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.ABJAD_API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      await clearTokenCookies();
      return NextResponse.json({ error: "invalid_refresh_token" }, { status: 401 });
    }

    const data = await res.json();
    await setTokenCookies(data.accessToken, data.refreshToken);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "network_error" }, { status: 503 });
  }
}
