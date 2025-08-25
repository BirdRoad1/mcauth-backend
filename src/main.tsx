import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainScreen from "./routes/main.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import SignupMcScreen from "./routes/signup-mc.tsx";
import SignupScreen from "./routes/signup.tsx";
import LoginScreen from "./routes/login.tsx";
import LoginMcScreen from "./routes/login-mc.tsx";
import NotepadScreen from "./routes/notepad.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/signup-mc" element={<SignupMcScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/login-mc" element={<LoginMcScreen />} />
        <Route path="/notepad" element={<NotepadScreen />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
