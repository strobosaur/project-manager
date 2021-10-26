import { NavLink } from 'react-router-dom';

// CSS STYLES
import './Sidebar.css'

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          {/* avatar & username */}
          <p>Hey yser</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/">
                <img src="" alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src="" alt="add project icon" />
                <span>Add new project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>      
    </div>
  )
}
