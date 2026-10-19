import { Link } from "react-router-dom";

const quickActions = [
  { title: "Discover people", text: "Find your next skill exchange.", to: "/discover", icon: "⌕" },
  { title: "Manage requests", text: "Review incoming and sent requests.", to: "/requests", icon: "↔" },
  { title: "Edit your profile", text: "Keep your skills up to date.", to: "/profile", icon: "✎" },
];

export default function Dashboard() {
  const profile = JSON.parse(localStorage.getItem("skillswap_profile") || "null");
  const requests = JSON.parse(localStorage.getItem("skillswap_requests") || "[]");
  const connections = JSON.parse(localStorage.getItem("skillswap_connections") || "[]");
  return (
    <section className="page-content">
      <div className="page-heading">
        <span className="eyebrow">YOUR SPACE</span>
        <h1>Welcome back{profile?.name ? `, ${profile.name.split(" ")[0]}` : ""}.</h1>
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
