import { useState } from "react";
import { Link } from "react-router-dom";

export default function Connections() {
  const [connections, setConnections] = useState(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem("skillswap_connections") || "[]");
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(connection =>
        connection &&
        typeof connection === "object" &&
        (typeof connection.id === "string" || (typeof connection.id === "number" && Number.isFinite(connection.id))) &&
        String(connection.id).trim() &&
        typeof connection.name === "string" &&
        connection.name.trim() &&
        typeof connection.role === "string" &&
        typeof connection.message === "string"
      );
    } catch { return []; }
  });

  const remove = id => {
    const updated = connections.filter(connection => String(connection.id) !== String(id));
    setConnections(updated);
    localStorage.setItem("skillswap_connections", JSON.stringify(updated));
  };

  return <section className="page-content">
    <div className="page-heading"><span className="eyebrow">CONNECTIONS</span><h1>Your Skill Connections</h1><p>People you have connected with through SkillSwap.</p></div>
    {connections.length ? <div className="connections-grid">{connections.map(connection => <article className="connection-card" key={connection.id}><div className="person-avatar">{connection.name.charAt(0)}</div><div className="connection-info"><h3>{connection.name}</h3><p className="muted">{connection.role}</p><p>{connection.message}</p></div><div className="connection-actions">{/^[1-4]$/.test(String(connection.id)) && <Link className="button button-dark" to={`/profile/${connection.id}`}>View Profile</Link>}<button className="button button-light" onClick={() => remove(connection.id)}>Remove</button></div></article>)}</div> : <div className="empty-state empty-state-large"><div className="empty-icon">↔</div><h2>No connections yet</h2><p>Accept an incoming skill swap request to start building your network.</p><Link className="button button-dark" to="/discover">Discover People</Link></div>}
  </section>;
}
