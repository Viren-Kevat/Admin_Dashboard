import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("mail");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState(""); // Add this line
  const [resendTimer, setResendTimer] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return setMessage("❌ Email is missing from the URL.");
    if (password !== confirm) return setMessage("❌ Passwords do not match.");
    if (!otp) return setMessage("❌ OTP is required.");

    try {
      const res = await fetch("http://localhost:3000/api/update_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, otp }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Password updated successfully.");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMessage(data.message || "❌ Failed to reset password.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error.");
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/sent_Link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ OTP sent again.");
        setResendTimer(600); // restart 10 min timer
      } else {
        setMessage(data.message || "❌ Failed to resend OTP.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error while resending OTP.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "5rem auto",
        padding: "2rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Reset Password
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          type="password"
          placeholder="New Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "0.75rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          style={{
            padding: "0.75rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
        <input
          type="text"
          placeholder="Enter OTP"
          required
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          style={{
            padding: "0.75rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "0.75rem",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Reset Password
        </button>
      </form>
      <button
        type="button"
        onClick={handleResendOtp}
        disabled={resendTimer > 0}
        style={{
          marginTop: "1rem",
          padding: "0.75rem",
          backgroundColor: resendTimer > 0 ? "#ccc" : "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "1rem",
          cursor: resendTimer > 0 ? "not-allowed" : "pointer",
        }}
      >
        {resendTimer > 0
          ? `Resend OTP in ${Math.floor(resendTimer / 60)}:${String(
              resendTimer % 60
            ).padStart(2, "0")}`
          : "Resend OTP"}
      </button>

      {message && (
        <p style={{ marginTop: "1.5rem", textAlign: "center", color: "#444" }}>
          {message}
        </p>
      )}
    </div>
  );
}
