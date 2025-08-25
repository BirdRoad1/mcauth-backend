import { Navigate, useNavigate } from "react-router";

export default function MainScreen() {
  const navigate = useNavigate();

  if (localStorage.getItem("token") !== null) {
    return <Navigate to={{ pathname: "/notepad" }} />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 15,
      }}
    >
      <h1>MCAuth Demo</h1>
      <p>This is a simple notepad app to demo MCAuth "security."</p>
      <div
        style={{
          display: "flex",
          gap: 5,
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </button>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
