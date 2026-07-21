import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    const backendRes = await fetch(`${process.env.ABJAD_API_BASE_URL}/auth/password-reset/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json({ error: data.error }, { status: backendRes.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "network_error" }, { status: 503 });
  }
}
