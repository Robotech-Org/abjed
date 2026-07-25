import { cookies } from "next/headers";

export async function setTokenCookies(accessToken: string, refreshToken: string) {
  const store = await cookies();
  const isProd = process.env.NODE_ENV === "production";
  store.set("accessToken", accessToken, {
    httpOnly: true, secure: isProd, sameSite: "lax", path: "/", maxAge: 60 * 15, // 15 min, matches backend
  });
  store.set("refreshToken", refreshToken, {
    httpOnly: true, secure: isProd, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30,
  });
  // Client-readable cookie for UI state (NOT used for actual authentication)
  store.set("isLoggedIn", "true", {
    httpOnly: false, secure: isProd, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearTokenCookies() {
  const store = await cookies();
  store.delete("accessToken");
  store.delete("refreshToken");
  store.delete("isLoggedIn");
}