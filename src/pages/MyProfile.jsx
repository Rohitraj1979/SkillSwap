import { useState } from "react";

const defaultProfile = {
  name: "SkillSwap member",
  role: "Java Full Stack Developer",
  location: "Mumbai, India",
  about: "I'm interested in software development and learning new technologies through skill exchange.",
  teaches: ["Java", "HTML", "CSS", "JavaScript"],
  wantsToLearn: ["Spring Boot", "React", "SQL"],
};

function loadProfile() {
  try {
    const stored = JSON.parse(localStorage.getItem("skillswap_profile") || "null");
    const savedProfile = stored && typeof stored === "object" && !Array.isArray(stored) ? stored : {};
    const profile = { ...defaultProfile, ...savedProfile };
    const validSkills = (skills) => Array.isArray(skills) && skills.every((skill) => typeof skill === "string" && skill.trim());

    return {
      ...profile,
      teaches: validSkills(savedProfile.teaches) ? savedProfile.teaches : defaultProfile.teaches,
      wantsToLearn: validSkills(savedProfile.wantsToLearn) ? savedProfile.wantsToLearn : defaultProfile.wantsToLearn,
    };
  } catch {
    return defaultProfile;
  }
}

export default function MyProfile() {
  const [profile, setProfile] = useState(loadProfile);
  const [form, setForm] = useState(() => ({ ...loadProfile(), teaches: loadProfile().teaches.join(", "), wantsToLearn: loadProfile().wantsToLearn.join(", ") }));
  const [editing, setEditing] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  const update = e => setForm(current => ({ ...current, [e.target.name]: e.target.value }));
  const edit = () => {
    setForm({ ...profile, teaches: profile.teaches.join(", "), wantsToLearn: profile.wantsToLearn.join(", ") });
    setEditing(true);
    setSavedMessage("");
  };
  const save = e => {
    e.preventDefault();
    const updated = {
      ...form,
      name: form.name.trim() || "SkillSwap member",
      teaches: form.teaches.split(",").map(s => s.trim()).filter(Boolean),
      wantsToLearn: form.wantsToLearn.split(",").map(s => s.trim()).filter(Boolean),
    };
    localStorage.setItem("skillswap_profile", JSON.stringify(updated));
    window.dispatchEvent(new Event("skillswap-profile-updated"));
    setProfile(updated);
    setForm({ ...updated, teaches: updated.teaches.join(", "), wantsToLearn: updated.wantsToLearn.join(", ") });
    setEditing(false);
    setSavedMessage("Profile saved in this browser.");
  };

  return <section className="page-content">
    <div className="page-heading profile-page-heading"><div><span className="eyebrow">MY PROFILE</span><h1>Your Profile</h1><p>Manage the information other SkillSwap members see about you.</p></div>{!editing && <button className="button button-dark" onClick={edit}>Edit Profile</button>}</div>
    {savedMessage && <div className="success-message">{savedMessage}</div>}
    {editing ? <form className="profile-edit-card" onSubmit={save}>
      <label>Name<input name="name" value={form.name} onChange={update} required /></label>
      <label>Role<input name="role" value={form.role} onChange={update} required /></label>
      <label>Location<input name="location" value={form.location} onChange={update} /></label>
      <label>About<textarea name="about" rows="4" value={form.about} onChange={update} /></label>
      <label>Skills I Teach<input name="teaches" value={form.teaches} onChange={update} placeholder="Java, React, SQL" /><small>Separate skills with commas.</small></label>
      <label>Skills I Want to Learn<input name="wantsToLearn" value={form.wantsToLearn} onChange={update} placeholder="Spring Boot, AWS" /><small>Separate skills with commas.</small></label>
      <div className="form-actions"><button className="button button-dark" type="submit">Save Changes</button><button className="button button-light" type="button" onClick={() => setEditing(false)}>Cancel</button></div>
    </form> : <div className="profile-detail-card own-profile-card">
      <div className="profile-detail-top"><div className="profile-detail-avatar">{profile.name.charAt(0)}</div><div><h2>{profile.name}</h2><p>{profile.role}</p><small>📍 {profile.location}</small></div></div>
      <div className="profile-detail-section"><h2>About</h2><p>{profile.about}</p></div>
      <div className="profile-detail-columns">
        <div className="profile-detail-section"><h2>Skills I Teach</h2><div className="person-skills">{profile.teaches.map(skill => <span className="person-skill" key={skill}>{skill}</span>)}</div></div>
        <div className="profile-detail-section"><h2>Skills I Want to Learn</h2><div className="person-skills">{profile.wantsToLearn.map(skill => <span className="person-skill want" key={skill}>{skill}</span>)}</div></div>
      </div>
    </div>}
  </section>;
}
