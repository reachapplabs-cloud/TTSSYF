import { NavLink, Route, Routes } from "react-router-dom";
import VoiceSamplePage from "./pages/VoiceSamplePage";
import ReviewPage from "./pages/ReviewPage";
import AvatarPage from "./pages/AvatarPage";

export default function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">Relay</div>
        <nav>
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Free Voice Sample
          </NavLink>
          <NavLink to="/engine" className={({ isActive }) => (isActive ? "active" : "")}>
            Engine
          </NavLink>
          <NavLink to="/avatar" className={({ isActive }) => (isActive ? "active" : "")}>
            Avatar
          </NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<VoiceSamplePage />} />
          <Route path="/engine" element={<ReviewPage />} />
          <Route path="/avatar" element={<AvatarPage />} />
        </Routes>
      </main>
      <footer>
        Relay by Zo &amp; Aadi — directable, not automated. Your Avatar, everywhere you publish.
      </footer>
    </div>
  );
}
