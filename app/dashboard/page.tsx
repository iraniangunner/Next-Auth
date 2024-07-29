import { useContext } from "react";
import { SessionContext } from "../provider/sessionProvider";
import { getSession } from "../lib/session";
import { redirect } from "next/navigation";

export default async function Dashboard() {

  const session = await getSession();

  if (!session) {
    redirect("/login")
  }
  const user = session?.user
  return (
    <div>
      {user.username}
      <br />
      {user.email}
      <h1>Hello</h1>
    </div>
  );
}
