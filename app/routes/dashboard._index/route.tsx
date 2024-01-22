import { Link } from "@remix-run/react";
import { useState } from "react";

import { useOptionalUser, parseNgrams } from "~/utils";
const Dashboard = (props) => {
  const maybeUser = useOptionalUser();
  const [text, setText] = useState("");
  const [delimiter, setDelimiter] = useState("");
  return (
    <>
      <h1>dashboard</h1>
      {maybeUser ? (
        JSON.stringify(maybeUser)
      ) : (
        <p>
          no user found, <Link to={"/login"}>login</Link>
        </p>
      )}
      <input
        type="text"
        value={delimiter}
        onChange={(e) => setDelimiter(e.target.value)}
      />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>{JSON.stringify(parseNgrams(text, 2, delimiter))}</p>
    </>
  );
};
export default Dashboard;
