import { NavLink } from 'react-router-dom';
import smiskiWorking from '../Smiskis/Smiski-Working.png';
import './sidebar.css'; 

export default function Sidebar () {
    return (
    <aside className="sidebar">
        <div className="sidebar-brand">GlowSeeker</div>

        <nav className="sidebar-nav">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                Home ♡
            </NavLink>

            <NavLink to="/create" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                Create a Smiski ♡
            </NavLink>

            <NavLink to="/gallery" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                Smiski Gallery ♡
            </NavLink>
        </nav>

        <div className="sidebar-footer">
            <img src={smiskiWorking} alt="Smiski Working" className="sidebar-image" />
        </div>
    </aside>
    );
}