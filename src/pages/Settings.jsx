
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

const DEFAULT_SETTINGS = {
  darkMode: false,
  emailNotifications: true,
  requestNotifications: true,
  matchNotifications: true,
  publicProfile: true,
};

function getSavedSettings() {
  try {
    const saved = localStorage.getItem("skillswap_settings");
    return saved
      ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
      : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export default function Settings() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState(getSavedSettings);
  const [message, setMessage] = useState("");

  const profile = (() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("skillswap_profile") || "{}"
      );
      if (!saved || typeof saved !== "object" || Array.isArray(saved)) return {};
      return {
        ...saved,
        name: typeof saved.name === "string" ? saved.name : "",
        role: typeof saved.role === "string" ? saved.role : "",
        location: typeof saved.location === "string" ? saved.location : "",
      };
    } catch {
      return {};
    }
  })();

  useEffect(() => {
    document.documentElement.classList.toggle(
      "skillswap-dark",
      settings.darkMode
    );

    localStorage.setItem(
      "skillswap_settings",
      JSON.stringify(settings)
    );
  }, [settings]);

  function updateSetting(key, value) {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));
    setMessage("Settings updated successfully.");
  }

  function resetSettings() {
    setSettings({ ...DEFAULT_SETTINGS });
    setMessage("Settings restored to their defaults.");
  }

  function handleSignOut() {
    const confirmed = window.confirm(
      "Are you sure you want to sign out?"
    );

    if (!confirmed) return;

    // Frontend-only demo: remove any demo login flag if present.
    localStorage.removeItem("skillswap_logged_in");
    navigate("/login");
  }

  return (
    <div className="settings-page">
      <div className="settings-heading">
        <div>
          <p className="settings-eyebrow">PREFERENCES</p>
          <h1>Settings</h1>
          <p className="settings-subtitle">
            Personalize your SkillSwap experience.
          </p>
        </div>
        <span className="settings-icon">⚙️</span>
      </div>

      {message && (
        <div className="settings-message" role="status">
          {message}
          <button
            type="button"
            onClick={() => setMessage("")}
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}

      <section className="settings-card">
        <div className="settings-section-heading">
          <span className="settings-section-icon">🎨</span>
          <div>
            <h2>Appearance</h2>
            <p>Choose how SkillSwap looks on your device.</p>
          </div>
        </div>

        <SettingRow
          title="Dark mode"
          description="Use a darker appearance across the app."
          checked={settings.darkMode}
          onChange={(value) => updateSetting("darkMode", value)}
        />
      </section>

      <section className="settings-card">
        <div className="settings-section-heading">
          <span className="settings-section-icon">👤</span>
          <div>
            <h2>Account</h2>
            <p>Your current SkillSwap profile information.</p>
          </div>
        </div>

        <div className="settings-account">
          <div className="settings-avatar">
            {(profile.name || "R").charAt(0).toUpperCase()}
          </div>
          <div>
            <h3>{profile.name || "Rohit Rajbhar"}</h3>
            <p>{profile.role || "SkillSwap Member"}</p>
            <p>{profile.location || "Location not added"}</p>
          </div>
          <button
            className="settings-secondary-button"
            onClick={() => navigate("/profile")}
          >
            Edit Profile
          </button>
        </div>
      </section>

      <section className="settings-card">
        <div className="settings-section-heading">
          <span className="settings-section-icon">🔔</span>
          <div>
            <h2>Notifications</h2>
            <p>Choose the updates you want to enable.</p>
          </div>
        </div>

        <SettingRow
          title="Email notifications"
          description="Preference for receiving updates by email."
          checked={settings.emailNotifications}
          onChange={(value) =>
            updateSetting("emailNotifications", value)
          }
        />

        <SettingRow
          title="Connection requests"
          description="Keep the request notification preference enabled."
          checked={settings.requestNotifications}
          onChange={(value) =>
            updateSetting("requestNotifications", value)
          }
        />

        <SettingRow
          title="Skill matches"
          description="Enable notifications for potential skill matches."
          checked={settings.matchNotifications}
          onChange={(value) =>
            updateSetting("matchNotifications", value)
          }
        />
      </section>

      <section className="settings-card">
        <div className="settings-section-heading">
          <span className="settings-section-icon">🔒</span>
          <div>
            <h2>Privacy</h2>
            <p>Manage your profile visibility preference.</p>
          </div>
        </div>

        <SettingRow
          title="Discover visibility"
          description="Allow your profile to appear in Discover."
          checked={settings.publicProfile}
          onChange={(value) => updateSetting("publicProfile", value)}
        />

        <p className="settings-note">
          Demo limitation: this preference is saved locally. It will
          not hide your profile from other users until the backend
          enforces it.
        </p>
      </section>

      <section className="settings-card">
        <div className="settings-section-heading">
          <span className="settings-section-icon">🛡️</span>
          <div>
            <h2>Password & Security</h2>
            <p>Keep your account information protected.</p>
          </div>
        </div>

        <div className="settings-info">
          <strong>Password change unavailable</strong>
          <p>
            Changing your password requires a backend and secure
            authentication. We can implement this when we build the
            Java Spring Boot backend.
          </p>
        </div>
      </section>

      <section className="settings-card settings-danger-card">
        <div className="settings-section-heading">
          <span className="settings-section-icon">⚠️</span>
          <div>
            <h2>Account Actions</h2>
            <p>Manage your local preferences and session.</p>
          </div>
        </div>

        <div className="settings-action-row">
          <div>
            <h3>Reset settings</h3>
            <p>Restore all preferences to their default values.</p>
          </div>
          <button
            className="settings-secondary-button"
            onClick={resetSettings}
          >
            Reset
          </button>
        </div>

        <div className="settings-action-row">
          <div>
            <h3>Sign out</h3>
            <p>Return to the login page.</p>
          </div>
          <button
            className="settings-danger-button"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </section>

      <p className="settings-footer">
        SkillSwap · Settings are stored on this device.
      </p>
    </div>
  );
}

function SettingRow({ title, description, checked, onChange }) {
  return (
    <div className="settings-row">
      <div className="settings-row-text">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        className={`settings-switch ${checked ? "is-on" : ""}`}
        onClick={() => onChange(!checked)}
      >
        <span />
      </button>
    </div>
  );
}
