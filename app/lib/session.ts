import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ token, expiresAt });

  cookies().set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession(token: string) {
  // const session = cookies().get("session")?.value;
  // const payload = await decrypt(session);

  // if (!session || !payload) {
  //   return null;
  // }

  // const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  // cookies().set("session", session, {
  //   httpOnly: true,
  //   secure: true,
  //   expires: expires,
  //   sameSite: "lax",
  //   path: "/",
  // });
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ token, expiresAt });

  cookies().set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  const payload = await decrypt(session);
  if (!payload) return null;

  //1.fetch refresh token to get new access token
  //2.update session with new access token
  //3.if new access token expired then redirect to login page

  // if (!session || !payload) {
  //   const res = await fetch("https://dummyjson.com/auth/refresh", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       refreshToken:
  //         typeof window !== "undefined" ? localStorage.getItem("token") : "",
  //       // expiresInMins: 30, // optional, defaults to 60
  //     }),
  //   });

  //   if (res.status === 401) {
  //     if (typeof window !== "undefined") {
  //       localStorage.removeItem("token");
  //     }

  //     redirect("/login");
  //   }
  //   const data = await res.json();
  //   await updateSession(data.accessToken);
  // }

  const res =
    /* providing token in bearer */
    await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    });

  if (!res.ok) {
    return null;
  }

  const user = await res.json();

  if (typeof window !== "undefined") {
    localStorage.setItem("token", user.refreshToken);
  }

  // localStorage.setItem("token", user.refreshToken);

  return { user };
}

export function deleteSession() {
  cookies().delete("session");
}
