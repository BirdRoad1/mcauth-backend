import { Link, useNavigate } from "react-router";
import { API } from "../API";
import { useState } from "react";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        minWidth: 300,
      }}
    >
      <h1 style={{ margin: 0 }}>Sign Up</h1>
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
          let res;
          try {
            res = await API.startSignup(username);
          } catch (err) {
            alert(err instanceof Error ? err.message : String(err));
          }

          console.log(res);
          navigate("/signup-mc", {
            state: {
              id: res.id,
              code: res.code,
            },
          });
        }}
      >
        Continue
      </button>
      <p>
        Already have an account?
        <br />
        Click <Link to={{ pathname: "/login" }}>here</Link> to login.
      </p>
    </div>
  );
}
