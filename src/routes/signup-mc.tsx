import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { API } from "../API";

export default function SignupMcScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  const id = location.state?.id;
  const code = location.state?.code;
  const [status, setStatus] = useState("UNKNOWN");

  useEffect(() => {
    if (typeof id !== "string") return;

    let interval: number = -1;
    const update = async () => {
      try {
        const { status } = await API.getSignupStatus(id);
        setStatus(status);
        if (status === "COMPLETE") {
          clearInterval(interval);
          // Submit!
          try {
            const token = await API.submitSignup(id);
            localStorage.setItem("token", token);

            alert("Account created!");
            navigate("/notepad");
          } catch (err) {
            alert(err instanceof Error ? err.message : String(err));
          }
        }
      } catch (err) {
        console.log(err);
        navigate("/signup");
      }
    };

    interval = setInterval(update, 1000);
    update();

    return () => clearInterval(interval);
  }, [id, navigate]);

  if (typeof id !== "string" || typeof code !== "string") {
    return <Navigate to="/signup" />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 15,
        alignItems: "center",
      }}
    >
      <h1 style={{ margin: 0 }}>Sign Up</h1>
      <p>To continue signing up, please join the following Minecraft server:</p>
      <p
        style={{
          backgroundColor: "#0f0f0fff",
          width: "fit-content",
          padding: "5px 10px",
          borderRadius: 4,
        }}
      >
        mcauth.jlmsz.com
      </p>
      <p>Then, type the following in the chat:</p>
      <p
        style={{
          backgroundColor: "#0f0f0fff",
          width: "fit-content",
          padding: "5px 10px",
          borderRadius: 4,
        }}
      >
        /mcauth {code}
      </p>
      <div
        style={{
          padding: "5px 10px",
          backgroundColor: "#0f0f0fff",
        }}
      >
        <p>
          Passblock status: <span style={{ color: "#929292ff" }}>{status}</span>
        </p>
      </div>
    </div>
  );
}
