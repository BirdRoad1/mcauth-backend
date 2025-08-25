import { Link, useNavigate } from "react-router";
import { API } from "../API";
import { useState } from "react";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        minWidth: 300
      }}
    >
      <h1 style={{ margin: 0 }}>Login</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          textAlign: "left",
        }}
      >
        <p style={{ margin: 0 }}>Username</p>
        <input
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          style={{
            height: 25,
            paddingLeft: 8,
            borderRadius: 4,
            border: "1px solid grey",
          }}
        />
      </div>
      <button
        onClick={async () => {
          try {
            const res = await API.startLogin(username);

            console.log(res);
            navigate("/login-mc", {
              state: {
                id: res.id,
                code: res.code,
              },
            });
          } catch (err) {
            alert(err instanceof Error ? err.message : String(err));
          }
        }}
      >
        Continue
      </button>
      <p>
        No account?<br />Click{" "}
        <Link to={{pathname: '/signup'}}>
          here
        </Link>{" "}
        to register one
      </p>
    </div>
  );
}
