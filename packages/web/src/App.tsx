import { NavLink, Route, Routes } from "react-router-dom";
import VoiceSamplePage from "./pages/VoiceSamplePage";
import ReviewPage from "./pages/ReviewPage";

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
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<VoiceSamplePage />} />
          <Route path="/engine" element={<ReviewPage />} />
        </Routes>
      </main>
      <footer>
        Relay by Zo &amp; Aadi — human-in-the-loop content, everywhere you publish.
      </footer>
    </div>
  );
}
