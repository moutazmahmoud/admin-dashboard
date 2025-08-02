import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useState } from "react";
import InputField from "@/components/Input";
import AuthModal from "@/components/AuthModal";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isInvalid = !email;

  const handleResetPassword = async () => {
    if (loading || isInvalid) return;

    setError("");
    setMessage("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent successfully.");
    } catch (err: any) {
      setError(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthModal
      title="Forgot Password"
      description="Enter your email to receive a reset link"
      buttonText={loading ? "Sending..." : "Send Reset Email"}
      onClick={handleResetPassword}
      buttonDisabled={isInvalid || loading}
      bottomChildren={
        <div className="mt-1 flex items-center justify-center">
          Back to{" "}
          <Link to="/auth/login" className="text-blue-600 underline ml-1">
            Login
          </Link>
        </div>
      }
    >
      <label
        htmlFor="email"
        className="mb-0.5 block text-[1.125rem] font-semibold"
      >
        Email
      </label>
      <InputField
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        error={error}
        classes="mb-1.5"
      />
      {message && <p className="mt-1 text-sm text-green-600">{message}</p>}
    </AuthModal>
  );
}
