import { useState } from "react";
import { Toaster, toast } from "react-hot-toast"; // import toast
import "./css/Login.css"; // corrected CSS import path
import supabase from "../../supabaseClient"; // ensure correct path

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) toast.error(error.message); // show error
    else toast.success("Login successful!"); // show success
  };

  return (
    <>
      <form onSubmit={handleLogin} >
        <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <Toaster position="top-right" reverseOrder={false} />{" "}
      {/* toast container */}
    </>
  );
}

export default Login;
