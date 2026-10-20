import { Link } from "react-router-dom";

function readStorageObject(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value && typeof value === "object" && !Array.isArray(value) ? value : null;
  } catch {
    return null;
  }
}

function readStorageArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

const quickActions = [
  { title: "Discover people", text: "Find your next skill exchange.", to: "/discover", icon: "⌕" },
  { title: "Manage requests", text: "Review incoming and sent requests.", to: "/requests", icon: "↔" },
  { title: "Edit your profile", text: "Keep your skills up to date.", to: "/profile", icon: "✎" },
];

export default function Dashboard() {
  const profile = readStorageObject("skillswap_profile");
  const requests = readStorageArray("skillswap_requests");
  const connections = readStorageArray("skillswap_connections");
  const firstName = typeof profile?.name === "string" ? profile.name.trim().split(/\s+/)[0] : "";
  return (
    <section className="page-content">
      <div className="page-heading">
        <span className="eyebrow">YOUR SPACE</span>
        <h1>Welcome back{firstName ? `, ${firstName}` : ""}.</h1>
        <p>Keep learning, keep sharing, and make your next connection.</p>
      </div>
      <div className="stats-grid">
        <div className="stat-card"><span>People to discover</span><strong>4+</strong><small>Find your next match</small></div>
        <div className="stat-card"><span>Sent requests</span><strong>{requests.length}</strong><small>Requests you have sent</small></div>
        <div className="stat-card"><span>Connections</span><strong>{connections.length}</strong><small>Your learning network</small></div>
      </div>
      <div className="section-heading"><div><h2>Quick actions</h2><p>Pick up where you left off.</p></div></div>
      <div className="quick-grid">
        {quickActions.map(action => <Link className="quick-card" to={action.to} key={action.title}><span className="quick-icon">{action.icon}</span><h3>{action.title}</h3><p>{action.text}</p><span className="card-arrow">↗</span></Link>)}
      </div>
      <div className="dashboard-banner"><div><span className="eyebrow">A LITTLE REMINDER</span><h2>Everyone has something to teach.</h2><p>Your next connection could help you unlock a whole new skill.</p></div><Link className="button button-dark" to="/discover">Explore members ↗</Link></div>
    </section>
  );
}
