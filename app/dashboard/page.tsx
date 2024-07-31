import LogoutButton from "../components/logoutButton";
import { getSession } from "../lib/session";
import { redirect } from "next/navigation";
import { updateSession } from "../lib/session";

export default async function Dashboard() {
  const session = await getSession();

  // if (!session) {

  // //1.fetch refresh token to get new access token
  // //2.if new access token expired and retutn 401 error then redirect to login page
  // //3.update session with new access token
  // //4.get user information with new access token
  //
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
  //   updateSession(data.accessToken);

  //    getSession();
  // }
  if (!session) {
    redirect("/login");
  }
  const user = session?.user;
  return (
    <div>
      {user.username}
      <br />
      {user.email}
      <br />
      {user.gender}
      <br />
      <h1>Hello</h1>
      <LogoutButton />
    </div>
  );
}
