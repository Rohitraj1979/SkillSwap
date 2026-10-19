import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Enter your password.");
      return;
    }
    setError("");
    navigate("/dashboard");
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <span className="eyebrow">WELCOME BACK</span>
        <h1>Log in to SkillSwap</h1>
        <p className="muted">Continue learning and sharing with your community.</p>
        {error && <div className="form-error">{error}</div>}
        <label>Email address<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></label>
        <label>Password
          <div className="password-wrap">
            <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
            <button type="button" className="password-toggle" onClick={() => setShowPassword(v => !v)}>{showPassword ? "Hide" : "Show"}</button>
          </div>
        </label>
        <button className="button button-dark full-width" type="submit">Log in</button>
        <p className="auth-switch">New to SkillSwap? <Link to="/register">Create an account</Link></p>
        <small className="demo-note">Demo frontend: login does not authenticate against a server yet.</small>
      </form>
    </main>
  );
}
