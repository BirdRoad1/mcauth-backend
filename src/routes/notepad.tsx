import { Navigate, useNavigate } from "react-router";

export default function NotepadScreen() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (token === null) {
    return <Navigate to={{ pathname: "/" }} />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
      }}
    >
      <button
        style={{
          position: "absolute",
          right: 20,
          top: 20,
        }}
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Logout
      </button>
      <h1 style={{ margin: 0 }}>Notepad</h1>
      <textarea
        style={{
          resize: "none",
          width: 300,
          height: 500,
          padding: 10,
          fontFamily: '"Roboto", sans-serif',
          outline: "none",
        }}
        placeholder="Type here..."
      ></textarea>
      <div
        style={{
          display: "flex",
          gap: 5,
        }}
      >
        <button>Save</button>
        <button>Share</button>
      </div>
    </div>
  );
}
