import { NextRequest, NextResponse } from "next/server";
import { setTokenCookies } from "@/lib/cookies";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const res = await fetch(`${process.env.ABJAD_API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.error }, { status: res.status });
    }

    await setTokenCookies(data.accessToken, data.refreshToken);
    return NextResponse.json({ user: data.user });
  } catch (error) {
    return NextResponse.json({ error: "network_error" }, { status: 503 });
  }
}
