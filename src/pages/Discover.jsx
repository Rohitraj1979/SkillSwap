import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const defaultPeople = [
  { id: "1", name: "Aarav Sharma", role: "Frontend Developer", location: "Mumbai, India", teaches: ["React", "JavaScript", "HTML", "CSS"], wantsToLearn: ["Java", "Spring Boot"] },
  { id: "2", name: "Rahul Mehta", role: "Java Developer", location: "Pune, India", teaches: ["Java", "Spring Boot", "SQL"], wantsToLearn: ["React", "JavaScript"] },
  { id: "3", name: "Priya Patel", role: "Data Analyst", location: "Mumbai, India", teaches: ["SQL", "Python", "Excel"], wantsToLearn: ["React", "Frontend Development"] },
  { id: "4", name: "Aditya Singh", role: "Backend Developer", location: "Delhi, India", teaches: ["Node.js", "Express", "MongoDB"], wantsToLearn: ["Java", "Spring Boot"] },
];

const normalize = (value) => String(value || "").trim().toLowerCase();

function normalizeSkills(skills) {
  if (!Array.isArray(skills)) return [];

  const uniqueSkills = new Map();
  skills.forEach((skill) => {
    if (typeof skill !== "string") return;
    const normalized = normalize(skill);
    if (normalized && !uniqueSkills.has(normalized)) {
      uniqueSkills.set(normalized, skill.trim());
    }
  });
  return [...uniqueSkills.entries()];
}

function getPersonSkills(person, key) {
  return normalizeSkills(person?.[key]);
}

function calculateMatch(person, myProfile) {
  if (person.id === "me") {
    return { learnFromThem: [], learnFromMe: [], percentage: 0 };
  }

  const myTeaches = getPersonSkills(myProfile, "teaches");
  const myWantsToLearn = getPersonSkills(myProfile, "wantsToLearn");
  const personTeaches = getPersonSkills(person, "teaches");
  const personWantsToLearn = getPersonSkills(person, "wantsToLearn");

  const personTeachesSet = new Set(personTeaches.map(([normalized]) => normalized));
  const personWantsSet = new Set(personWantsToLearn.map(([normalized]) => normalized));
  const myTeachesSet = new Set(myTeaches.map(([normalized]) => normalized));
  const myWantsSet = new Set(myWantsToLearn.map(([normalized]) => normalized));

  const learnFromThem = myWantsToLearn
    .filter(([normalized]) => personTeachesSet.has(normalized))
    .map(([, skill]) => skill);
  const learnFromMe = myTeaches
    .filter(([normalized]) => personWantsSet.has(normalized))
    .map(([, skill]) => skill);
  const distinctOwnSkills = new Set([...myTeachesSet, ...myWantsSet]).size;

  // Match percentage is distinct exchange opportunities / distinct skills in my profile, capped at 100%.
  const opportunities = learnFromThem.length + learnFromMe.length;
  const percentage = distinctOwnSkills
    ? Math.min(100, Math.round((opportunities / distinctOwnSkills) * 100))
    : 0;

  return { learnFromThem, learnFromMe, percentage };
}

export default function Discover() {
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  const myProfile = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("skillswap_profile") || "null"); }
    catch { return null; }
  }, []);

  const people = useMemo(() => [...defaultPeople], []);

  const allSkills = useMemo(() => {
    const skills = people.flatMap((person) => [
      ...getPersonSkills(person, "teaches"),
      ...getPersonSkills(person, "wantsToLearn"),
    ]);
    return [...new Map(skills).values()].sort((a, b) => a.localeCompare(b));
  }, [people]);

  const filteredPeople = people
    .map((person) => ({ person, match: calculateMatch(person, myProfile) }))
    .filter(({ person }) => {
      const text = normalize(search);
      const haystack = [
        person.name,
        person.role,
        person.location,
        ...getPersonSkills(person, "teaches").map(([, skill]) => skill),
        ...getPersonSkills(person, "wantsToLearn").map(([, skill]) => skill),
      ].map(normalize);
      const matchesSearch = !text || haystack.some((value) => value.includes(text));
      const personSkills = [
        ...getPersonSkills(person, "teaches"),
        ...getPersonSkills(person, "wantsToLearn"),
      ];
      const matchesSkill = !selectedSkill
        || personSkills.some(([normalized]) => normalized === normalize(selectedSkill));
      return matchesSearch && matchesSkill;
    });

  if (sortOrder === "match") {
    filteredPeople.sort((a, b) => b.match.percentage - a.match.percentage);
  }

  return (
    <section className="page-content discover-page">
      <div className="page-heading">
        <span className="eyebrow">DISCOVER</span>
        <h1>Find Your Skill Match</h1>
        <p>Discover people who can teach you something new and learn from you.</p>
      </div>
      <div className="discover-filters">
        <input aria-label="Search people" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, role or skill..." />
        <select aria-label="Filter by skill" value={selectedSkill} onChange={e => setSelectedSkill(e.target.value)}>
          <option value="">All Skills</option>
          {allSkills.map(skill => <option key={skill} value={skill}>{skill}</option>)}
        </select>
        <select aria-label="Sort people" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="default">Default order</option>
          <option value="match">Highest match first</option>
        </select>
      </div>
      <div className="section-heading results-heading"><h2>People</h2><span>{filteredPeople.length} found</span></div>
      {filteredPeople.length ? <div className="people-grid">
        {filteredPeople.map(({ person, match }) => {
          const teaches = getPersonSkills(person, "teaches").map(([, skill]) => skill);
          const wantsToLearn = getPersonSkills(person, "wantsToLearn").map(([, skill]) => skill);
          return <article className="person-card" key={person.id}>
            <div className="person-top"><div className="person-avatar">{person.name?.charAt(0) || "?"}</div><div className="person-info"><h3>{person.name}</h3><p>{person.role}</p><small>📍 {person.location}</small></div></div>
            <div className="person-skills-section"><p className="skill-label">TEACHES</p><div className="person-skills">{teaches.map((skill, index) => <span className="person-skill" key={`${normalize(skill)}-${index}`}>{skill}</span>)}</div></div>
            <div className="person-skills-section"><p className="skill-label">WANTS TO LEARN</p><div className="person-skills">{wantsToLearn.map((skill, index) => <span className="person-skill want" key={`${normalize(skill)}-${index}`}>{skill}</span>)}</div></div>
            {person.id !== "me" && <div className="skill-match">
              <div className="skill-match-header"><span>SKILL MATCH</span><strong className="match-badge">{match.percentage}% Match</strong></div>
              <div className="match-skills">
                <p><b>You can learn</b><span>{match.learnFromThem.length ? match.learnFromThem.join(", ") : "No shared skills yet"}</span></p>
                <p><b>You can teach</b><span>{match.learnFromMe.length ? match.learnFromMe.join(", ") : "No shared skills yet"}</span></p>
              </div>
            </div>}
            <Link className="button button-dark person-button" to={person.id === "me" ? "/profile" : `/profile/${person.id}`}>{person.id === "me" ? "My Profile" : "View Profile"}</Link>
          </article>;
        })}
      </div> : <div className="empty-state"><h3>No people found</h3><p>Try a different name, role or skill.</p></div>}
    </section>
  );
}
