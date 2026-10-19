import { Link, useNavigate, useParams } from "react-router-dom";

const sampleUsers = {
  "1": { id: "1", name: "Aarav Sharma", role: "Frontend Developer", location: "Mumbai, India", about: "I enjoy building accessible, polished web interfaces and sharing frontend knowledge.", teaches: ["React", "JavaScript", "HTML", "CSS"], wantsToLearn: ["Java", "Spring Boot"] },
  "2": { id: "2", name: "Rahul Mehta", role: "Java Developer", location: "Pune, India", about: "Java developer interested in backend engineering, APIs and collaborative learning.", teaches: ["Java", "Spring Boot", "SQL"], wantsToLearn: ["React", "JavaScript"] },
  "3": { id: "3", name: "Priya Patel", role: "Data Analyst", location: "Mumbai, India", about: "I work with data and enjoy helping people become more confident with SQL and analytics.", teaches: ["SQL", "Python", "Excel"], wantsToLearn: ["React", "Frontend Development"] },
  "4": { id: "4", name: "Aditya Singh", role: "Backend Developer", location: "Delhi, India", about: "I like learning backend technologies and sharing practical project experience.", teaches: ["Node.js", "Express", "MongoDB"], wantsToLearn: ["Java", "Spring Boot"] },
};

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const person = sampleUsers[id];

  const sendRequest = () => {
    const requests = JSON.parse(localStorage.getItem("skillswap_requests") || "[]");
    if (requests.some(request => String(request.id) === String(person.id))) {
      navigate("/requests");
      return;
    }
    requests.push({ id: person.id, name: person.name, role: person.role, message: `I'd like to exchange skills with you. I can teach ${(JSON.parse(localStorage.getItem("skillswap_profile") || "{}").teaches || []).join(", ")} and would like to learn from you.`, status: "pending" });
    localStorage.setItem("skillswap_requests", JSON.stringify(requests));
    navigate("/requests");
  };

  if (!person) return <section className="page-content"><div className="empty-state"><h2>Member not found</h2><Link to="/discover">Back to Discover</Link></div></section>;

  return <section className="page-content">
    <div className="back-row"><Link to="/discover">← Back to Discover</Link></div>
    <div className="profile-detail-card">
      <div className="profile-detail-top"><div className="profile-detail-avatar">{person.name.charAt(0)}</div><div><span className="eyebrow">SKILLSWAP MEMBER</span><h1>{person.name}</h1><p>{person.role}</p><small>📍 {person.location}</small></div><button className="button button-dark profile-request-button" onClick={sendRequest}>Request a skill swap ↗</button></div>
      <div className="profile-detail-section"><h2>About</h2><p>{person.about}</p></div>
      <div className="profile-detail-columns">
        <div className="profile-detail-section"><h2>Skills I Teach</h2><div className="person-skills">{person.teaches.map(skill => <span className="person-skill" key={skill}>{skill}</span>)}</div></div>
        <div className="profile-detail-section"><h2>Skills I Want to Learn</h2><div className="person-skills">{person.wantsToLearn.map(skill => <span className="person-skill want" key={skill}>{skill}</span>)}</div></div>
      </div>
    </div>
  </section>;
}
