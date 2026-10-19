import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="public-navbar">
      <Link className="brand" to="/">SkillSwap<span>.</span></Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <Link className="nav-cta" to="/register">Get Started</Link>
      </nav>
    </header>
  );
}
