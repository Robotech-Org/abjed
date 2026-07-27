import { NextRequest, NextResponse } from "next/server";
import { setTokenCookies } from "@/lib/cookies";

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

function isConfigured(): boolean {
  return !!clientId && clientId !== "xxxxxxxx" && clientId.length > 10;
}

export async function POST(req: NextRequest) {
  if (!isConfigured()) {
    return NextResponse.json(
      { error: "google_signin_not_configured" },
      { status: 501 },
    );
  }

  try {
    const { idToken } = await req.json();

    const res = await fetch(`${process.env.ABJAD_API_BASE_URL}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
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
