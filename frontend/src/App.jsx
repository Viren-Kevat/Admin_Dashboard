import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ResetPassword from "./components/PasswordTwo";
import ForgotPassword from "./components/PasswordOne";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/enter-password" element={<ResetPassword />} />
      <Route path="/forget-password" element={<ForgotPassword />} />
      <Route path="*" element={<Login />} /> {/* Default fallback */}
    </Routes>
  );
}
