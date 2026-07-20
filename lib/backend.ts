import { cookies } from "next/headers";
import { setTokenCookies, clearTokenCookies } from "./cookies";

export async function backendFetch(path: string, options: RequestInit = {}) {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const res = await fetch(`${process.env.ABJAD_API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    const refreshToken = (await cookies()).get("refreshToken")?.value;
    if (!refreshToken) throw new Error("session_expired");

    const refreshRes = await fetch(`${process.env.ABJAD_API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!refreshRes.ok) {
      await clearTokenCookies();
      throw new Error("session_expired");
    }

    const { accessToken: newAccess, refreshToken: newRefresh } = await refreshRes.json();
    await setTokenCookies(newAccess, newRefresh);

    return fetch(`${process.env.ABJAD_API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${newAccess}`,
        ...options.headers,
      },
    });
  }

  return res;
}