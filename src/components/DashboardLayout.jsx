import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const PROFILE_UPDATED_EVENT = "skillswap-profile-updated";

function readSidebarProfile() {
  try {
    const profile = JSON.parse(localStorage.getItem("skillswap_profile") || "null");
    if (!profile || typeof profile !== "object" || Array.isArray(profile)) throw new Error("Invalid profile");
    const name = typeof profile.name === "string" && profile.name.trim() ? profile.name.trim() : "SkillSwap member";
    const role = typeof profile.role === "string" && profile.role.trim() ? profile.role.trim() : "SkillSwap member";
    return { name, role, initial: name.charAt(0) };
  } catch {
    return { name: "SkillSwap member", role: "SkillSwap member", initial: "S" };
  }
}

const links = [
  ["/dashboard", "Dashboard"],
  ["/discover", "Discover"],
  ["/requests", "Requests"],
  ["/connections", "Connections"],
  ["/profile", "Profile"],
  ["/settings", "Settings"],
];

export default function DashboardLayout() {
  const [profile, setProfile] = useState(readSidebarProfile);

  useEffect(() => {
    const updateProfile = () => setProfile(readSidebarProfile());
    window.addEventListener(PROFILE_UPDATED_EVENT, updateProfile);
    return () => window.removeEventListener(PROFILE_UPDATED_EVENT, updateProfile);
  }, []);

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
          <div className="mini-avatar">{profile.initial}</div>
          <div><strong>{profile.name}</strong><small>{profile.role}</small></div>
        </div>
      </aside>
      <main className="app-main"><Outlet /></main>
    </div>
  );
}
