import { useContext } from "react";
import { SessionContext } from "../provider/sessionProvider";

export default function Dashboard() {

  const session = useContext(SessionContext);
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}
