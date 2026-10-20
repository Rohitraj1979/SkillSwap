import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const passwordValid = form.password.length >= 8 &&
    /^[A-Z]/.test(form.password) &&
    /[a-z]/.test(form.password) &&
    /\d/.test(form.password);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim()) return setError("Enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError("Enter a valid email address.");
    if (!passwordValid) return setError("Password must be at least 8 characters, start with an uppercase letter, and include a lowercase letter and a number.");
    if (form.password !== form.confirm) return setError("Passwords do not match.");
    localStorage.setItem("skillswap_profile", JSON.stringify({
      name: form.name.trim(),
      role: "SkillSwap Member",
      location: "Add your location",
      about: "I'm here to share what I know and learn new skills.",
      teaches: ["Java", "HTML", "CSS", "JavaScript"],
      wantsToLearn: ["Spring Boot", "React", "SQL"]
    }));
    window.dispatchEvent(new Event("skillswap-profile-updated"));
    setError("");
    navigate("/profile");
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <span className="eyebrow">JOIN THE COMMUNITY</span>
        <h1>Create your account</h1>
        <p className="muted">Start sharing your skills and learning from others.</p>
        {error && <div className="form-error">{error}</div>}
        <label>Full name<input name="name" value={form.name} onChange={update} placeholder="Your full name" /></label>
        <label>Email address<input type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" /></label>
        <label>Password
          <div className="password-wrap">
            <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={update} placeholder="Create a password" />
            <button type="button" className="password-toggle" onClick={() => setShowPassword(v => !v)}>{showPassword ? "Hide" : "Show"}</button>
          </div>
          {form.password && <small className={passwordValid ? "validation-good" : "validation-note"}>{passwordValid ? "Password requirements met." : "8+ characters, starts uppercase, includes lowercase and number."}</small>}
        </label>
        <label>Confirm password
          <div className="password-wrap">
            <input type={showConfirm ? "text" : "password"} name="confirm" value={form.confirm} onChange={update} placeholder="Repeat your password" />
            <button type="button" className="password-toggle" onClick={() => setShowConfirm(v => !v)}>{showConfirm ? "Hide" : "Show"}</button>
          </div>
          {form.confirm && <small className={form.confirm === form.password ? "validation-good" : "validation-note"}>{form.confirm === form.password ? "Passwords match." : "Passwords do not match."}</small>}
        </label>
        <button className="button button-dark full-width" type="submit">Create account</button>
        <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
        <small className="demo-note">Demo frontend: registration is stored locally in this browser.</small>
      </form>
    </main>
  );
}
