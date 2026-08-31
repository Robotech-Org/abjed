import { backendFetch } from "@/lib/backend";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await backendFetch("/auth/me/child-profile", {
      method: "GET",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    if (error.message === "session_expired") {
      return NextResponse.json({ error: "session_expired" }, { status: 401 });
    }
    return NextResponse.json({ error: "network_error" }, { status: 503 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await backendFetch("/auth/me/child-profile", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    if (error.message === "session_expired") {
      return NextResponse.json({ error: "session_expired" }, { status: 401 });
    }
    return NextResponse.json({ error: "network_error" }, { status: 503 });
  }
}
