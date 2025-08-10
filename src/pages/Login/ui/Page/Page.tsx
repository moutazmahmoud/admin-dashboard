
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import InputField from "@/components/Input";
import AuthModal from "@/components/AuthModal";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "@/components/PageWrapper";
import { loginUser } from "@/services/authService";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const setUser = useAuthStore((state) => state.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const isFormInvalid = !email || !password;

  const handleLogin = async () => {
    if (loading) return;

    if (!email || !password) {
      return setGeneralError("Please fill in all fields");
    }

    if (!emailRegex.test(email)) {
      return setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
    }

    setLoading(true);
    try {
      const result = await loginUser(email, password);
      setUser(result.user);
      navigate("/"); // redirect to dashboard
    } catch (err: any) {
      setGeneralError(err.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <AuthModal
        title="Login to Your Account"
        description="Enter your credentials to continue"
        buttonText={loading ? "Loading..." : "Login"}
        onClick={handleLogin}
        buttonDisabled={loading || isFormInvalid}
        bottomChildren={
          <div className="mt-4 flex items-center justify-center">
            Don’t have an account?
            <Link to="/auth/register" className="ml-2 text-blue-600 underline">
              Sign Up
            </Link>
          </div>
        }
      >
        <label
          htmlFor="email"
          className="mb-2 block text-[1.125rem] font-semibold"
        >
          Email
        </label>
        <InputField
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
          }}
          placeholder="Enter your email"
          error={errors.email}
          classes="mb-6"
        />

        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-[1.125rem] font-semibold"
          >
            Password
          </label>
          <Link to="/auth/forgot-password">Forgot Password?</Link>
        </div>
        <InputField
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password)
              setErrors((prev) => ({ ...prev, password: "" }));
          }}
          placeholder="Enter password"
          error={errors.password}
          classes="mb-6"
        />

        {generalError && (
          <p className="mt-4 text-sm text-red-500">{generalError}</p>
        )}
      </AuthModal>
    </PageWrapper>
  );
}
