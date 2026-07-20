import { NextRequest, NextResponse } from "next/server";
import { setTokenCookies } from "@/lib/cookies";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(`${process.env.ABJAD_API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data.error }, { status: res.status });
  }

  await setTokenCookies(data.accessToken, data.refreshToken);
  // Never send tokens back to the browser — only the user object.
  return NextResponse.json({ user: data.user });
}