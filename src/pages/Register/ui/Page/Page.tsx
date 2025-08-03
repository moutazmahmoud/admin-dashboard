import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import InputField from "@/components/Input";
import AuthModal from "@/components/AuthModal";
import CheckboxWithLabel from "@/components/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "@/components/PageWrapper";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {
  const setUser = useAuthStore((state) => state.setUser);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    userName: "",
    password: "",
    terms: "",
  });
  const navigate = useNavigate();

  const isFormInvalid = !email || !password || !userName || !terms;

  const handleRegister = async () => {
    if (loading) return;

    if (!email || !password || !userName) {
      return setGeneralError("Please fill in all fields");
    }

    if (!emailRegex.test(email)) {
      return setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
    }

    if (password.length < 6) {
      return setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters",
      }));
    }
    if (!terms) {
      return setErrors((prev) => ({
        ...prev,
        terms: "You must agree to the terms and conditions",
      }));
    }
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(result.user, {
        displayName: userName,
      });
      setUser({ ...result.user, displayName: userName });

      navigate("/");

      console.log("result:", result);
    } catch (err: any) {
      setGeneralError(err.message || "Registration error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <AuthModal
        title="Create an Account"
        description="Create an account to continue"
        buttonText={loading ? "Loading..." : "Sign Up"}
        onClick={handleRegister}
        buttonDisabled={loading || isFormInvalid}
        bottomChildren={
          <div className="mt-1 flex items-center justify-center">
            Already have an account?
            <Link to="/auth/login" className="ml-0.5 text-blue-600 underline">
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
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
          }}
          placeholder="Enter your email"
          error={errors.email}
          classes="mb-1.5"
        />
        <label
          htmlFor="user-name"
          className="mb-0.5 block text-[1.125rem] font-semibold"
        >
          User name
        </label>
        <InputField
          type="text"
          id="user-name"
          name="user-name"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            if (errors.userName)
              setErrors((prev) => ({ ...prev, userName: "" }));
          }}
          placeholder="Enter your user name"
          error={errors.userName}
          classes="mb-1.5"
        />
        <div className="mb-0.5 flex items-center justify-between">
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
          classes="mb-1.5"
        />
        <CheckboxWithLabel
          checked={terms}
          onChange={() => setTerms(!terms)}
          label="I agree to the Terms and Conditions"
          id="terms-checkbox"
        />
        {errors.terms && (
          <p className="mt-1 text-sm text-red-500">{errors.terms}</p>
        )}
        {generalError && (
          <p className="mt-1 text-sm text-red-500">{generalError}</p>
        )}
      </AuthModal>
    </PageWrapper>
  );
}
