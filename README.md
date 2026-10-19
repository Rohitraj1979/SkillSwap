# SkillSwap — React + Vite

This is a reconstructed, runnable SkillSwap frontend based on the features built in our conversation. It includes:
- Home, Login and Register pages
- Dashboard layout and sidebar navigation
- Discover people, search, skill filter and simple two-way skill matching
- User profile pages
- My Profile editor saved to `localStorage`
- Incoming and outgoing requests
- Accepting a request creates a saved connection
- Connections page with remove action
- Responsive layout

## Requirements
Install Node.js LTS (which includes npm).

## Run the project
1. Extract `skillswap-project.zip`.
2. Open the extracted `skillswap-project` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the URL shown by Vite, normally `http://localhost:5173/`.

## Useful routes
- `/` — Home
- `/login` — Login demo
- `/register` — Register demo
- `/dashboard` — Dashboard
- `/discover` — Discover users and skill matches
- `/profile` — Your profile
- `/profile/1` — Sample member profile
- `/requests` — Incoming and sent requests
- `/connections` — Accepted connections

## Notes
- This is a frontend demo. Authentication and multi-user data are not connected to a backend yet.
- Browser `localStorage` is used for profile, requests, and connections. Data stays in the same browser until cleared.
- The starter incoming requests are demo data. Clear the keys beginning with `skillswap_` from browser DevTools → Application → Local Storage if you want a fresh demo.
