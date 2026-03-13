import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

// Import assets
import HomeIcon from "../assets/Home.svg";
import PrayersIcon from "../assets/Prayers.svg";
import TasbihIcon from "../assets/Tasbih.svg";
import QuranIcon from "../assets/9oran-bnjoum.svg";
import StatsIcon from "../assets/stats.svg";

function Navbar() {
  return (
    <div className="navbar">
      <NavLink
        to="/home"
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <img src={HomeIcon} alt="Home" className="nav-icon" />
        <p>Home</p>
      </NavLink>

      <NavLink
        to="/prayer"
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <img src={PrayersIcon} alt="Prayers" className="nav-icon" />
        <p>Prayers</p>
      </NavLink>

      <NavLink
        to="/progress"
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <img src={TasbihIcon} alt="Tasbih" className="nav-icon" />
        <p>Progress</p>
      </NavLink>

      <NavLink
        to="/quiz"
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <img src={QuranIcon} alt="Quran" className="nav-icon" />
        <p>Quiz</p>
      </NavLink>

      <NavLink
        to="/adhkar"
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <img src={StatsIcon} alt="Stats" className="nav-icon" />
        <p>Adhkar</p>
      </NavLink>
    </div>
  );
}

export default Navbar;
