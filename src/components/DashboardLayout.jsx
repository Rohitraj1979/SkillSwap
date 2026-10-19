import { NavLink, Outlet } from "react-router-dom";

const links = [
  ["/dashboard", "Dashboard"],
  ["/discover", "Discover"],
  ["/requests", "Requests"],
  ["/connections", "Connections"],
  ["/profile", "Profile"],
  ["/settings", "Settings"],
];

export default function DashboardLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink to="/dashboard" className="sidebar-brand">SkillSwap</NavLink>
        <nav className="sidebar-nav">
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/profile"}
              className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="mini-avatar">R</div>
          <div><strong>Rohit Rajbhar</strong><small>SkillSwap member</small></div>
        </div>
      </aside>
      <main className="app-main"><Outlet /></main>
    </div>
  );
}
