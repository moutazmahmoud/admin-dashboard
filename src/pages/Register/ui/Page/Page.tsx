import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import useAuthStore from "@/store/useAuthStore";
import { useState } from "react";
import InputField from "@/components/Input";
import AuthModal from "@/components/AuthModal";

export default function Register() {
  const setUser = useAuthStore((state) => state.setUser);
  const [email, setEmail] = useState("");
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
      description="Create a account to continue"
      buttonText="Sign Up"
      onClick={handleRegister}
    >
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

      <InputField
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        error={error}
        classes="mb-2.5"
      />
      <label htmlFor="password">Password</label>
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
