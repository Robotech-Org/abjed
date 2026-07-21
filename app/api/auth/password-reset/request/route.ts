import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const backendRes = await fetch(`${process.env.ABJAD_API_BASE_URL}/auth/password-reset/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json({ error: data.error }, { status: backendRes.status });
    }

    // Strip resetToken in production
    if (process.env.NODE_ENV === "production" && data.resetToken) {
      delete data.resetToken;
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "network_error" }, { status: 503 });
  }
}
