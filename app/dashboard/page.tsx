import { useContext } from "react";
import { SessionContext } from "../lib/provider";

export default function Dashboard() {

  const session = useContext(SessionContext);
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}
