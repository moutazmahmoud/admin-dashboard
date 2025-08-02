import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import useAuthStore from "@/store/useAuthStore";
import { useState } from "react";
import InputField from "@/components/Input";
import AuthModal from "@/components/AuthModal";

export default function Register() {
  const setUser = useAuthStore((state) => state.setUser);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setUser(result.user);

      console.log("result:", result);
    } catch (err) {
      alert("Registration error");
    }
  };

  return (
    <AuthModal
      title="Create an Account"
      description="Create an account to continue"
      buttonText="Sign Up"
      onClick={handleRegister}
    >
      <label htmlFor="email">Email address</label>
      <InputField
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        error={error}
        classes="mb-1.5"
      />
      <label htmlFor="user-name">User name</label>
      <InputField
        type="text"
        name="user-name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter your user name"
        error={error}
        classes="mb-1.5"
      />
      <div className="flex items-center justify-between">
        <label htmlFor="password">Password</label>
        <a href="">Forgot Password?</a>
      </div>
      <InputField
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your email"
        error={error}
        classes="mb-1.5"
      />
    </AuthModal>
  );
}
