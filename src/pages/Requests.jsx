import { useState } from "react";

const defaultIncoming = [
  { id: "101", name: "Neha Verma", role: "UI Designer", message: "I'd love to learn JavaScript and share UI design tips.", status: "pending" },
  { id: "102", name: "Vikram Joshi", role: "Backend Developer", message: "I can help with APIs and would like to learn frontend skills.", status: "pending" },
];

function load(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    if (saved !== null) return JSON.parse(saved);
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  } catch { return fallback; }
}

export default function Requests() {
  const [incoming, setIncoming] = useState(() => load("skillswap_incoming_requests", defaultIncoming));
  const [outgoing, setOutgoing] = useState(() => load("skillswap_requests", []));

  const accept = request => {
    const connections = load("skillswap_connections", []);
    if (!connections.some(item => String(item.id) === String(request.id))) {
      localStorage.setItem("skillswap_connections", JSON.stringify([...connections, { ...request, status: "connected" }]));
    }
    const updated = incoming.map(item => item.id === request.id ? { ...item, status: "accepted" } : item);
    setIncoming(updated);
    localStorage.setItem("skillswap_incoming_requests", JSON.stringify(updated));
  };

  const reject = id => {
    const updated = incoming.filter(item => item.id !== id);
    setIncoming(updated);
    localStorage.setItem("skillswap_incoming_requests", JSON.stringify(updated));
  };

  const cancel = id => {
    const updated = outgoing.filter(item => String(item.id) !== String(id));
    setOutgoing(updated);
    localStorage.setItem("skillswap_requests", JSON.stringify(updated));
  };

  return <section className="page-content">
    <div className="page-heading"><span className="eyebrow">REQUESTS</span><h1>Skill Swap Requests</h1><p>Manage the people you want to learn from and those who want to learn from you.</p></div>
    <section className="content-section">
      <div className="section-heading"><div><h2>Incoming Requests</h2><p>People who want to connect with you.</p></div><span className="count-badge">{incoming.filter(r => r.status === "pending").length}</span></div>
      <div className="request-list">
        {incoming.length ? incoming.map(request => <article className="request-card" key={request.id}><div className="person-avatar">{request.name.charAt(0)}</div><div className="request-info"><h3>{request.name}</h3><p className="muted">{request.role}</p><p>{request.message}</p></div>{request.status === "pending" ? <div className="request-actions"><button className="button button-dark" onClick={() => accept(request)}>Accept</button><button className="button button-light" onClick={() => reject(request.id)}>Reject</button></div> : <span className="status-pill accepted">Accepted</span>}</article>) : <div className="empty-state"><h3>No incoming requests</h3><p>You don't have any incoming requests right now.</p></div>}
      </div>
    </section>
    <section className="content-section">
      <div className="section-heading"><div><h2>Sent Requests</h2><p>Requests you have sent to other members.</p></div><span className="count-badge">{outgoing.length}</span></div>
      <div className="request-list">
        {outgoing.length ? outgoing.map(request => <article className="request-card" key={request.id}><div className="person-avatar">{request.name.charAt(0)}</div><div className="request-info"><h3>{request.name}</h3><p className="muted">{request.role}</p><p>{request.message}</p></div><div className="request-actions"><span className="status-pill pending">Pending</span><button className="button button-light" onClick={() => cancel(request.id)}>Cancel</button></div></article>) : <div className="empty-state"><h3>No sent requests yet</h3><p>Find someone on Discover and send them a skill swap request.</p></div>}
      </div>
    </section>
  </section>;
}
