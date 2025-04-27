import { useState } from "react";
import { Toaster, toast } from "react-hot-toast"; // import toast
import './css/Signup.css';
import supabase from "../../supabaseClient";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) toast.error(error.message);
    else toast.success("Signup successful! Please check your email.");
  };

  return (
    <>
      <form onSubmit={handleSignup} className="auth-form">
        <h2>Sign Up</h2>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default Signup;
