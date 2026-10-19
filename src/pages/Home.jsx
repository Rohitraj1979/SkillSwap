import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">LEARN TOGETHER. GROW TOGETHER.</span>
          <h1>Your skills are valuable.<br /><em>Share them.</em></h1>
          <p>Connect with people, exchange knowledge, and build new skills through meaningful peer-to-peer learning.</p>
          <div className="hero-actions">
            <Link className="button button-dark" to="/register">Start swapping <span>↗</span></Link>
            <Link className="button button-light" to="/discover">Explore members</Link>
          </div>
          <div className="hero-proof"><span className="proof-dot" /> A community built around shared learning</div>
        </div>
        <div className="hero-visual">
          <div className="visual-card visual-card-main">
            <div className="visual-top"><span className="visual-icon">↔</span><span className="pill">SKILL EXCHANGE</span></div>
            <h3>Knowledge grows<br />when it’s shared.</h3>
            <div className="exchange-row"><div className="exchange-avatar">R</div><div><strong>Rohit</strong><small>Teaches Java</small></div><span className="exchange-arrow">⇄</span><div className="exchange-avatar avatar-lilac">A</div><div><strong>Aarav</strong><small>Teaches React</small></div></div>
          </div>
          <div className="floating-note"><span>✦</span> Your next skill is one connection away.</div>
          <div className="decor decor-one" /><div className="decor decor-two" />
        </div>
      </section>
      <section className="feature-strip">
        <div><span>01</span><h3>Discover people</h3><p>Find members with skills you want to learn.</p></div>
        <div><span>02</span><h3>Exchange knowledge</h3><p>Share your experience while learning from others.</p></div>
        <div><span>03</span><h3>Grow together</h3><p>Build a network that supports your growth.</p></div>
      </section>
    </main>
  );
}
