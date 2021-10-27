import { NavLink } from 'react-router-dom';

// CSS STYLES
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon2.svg';
import PlusIcon from '../assets/plus_icon2.svg';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          {/* avatar & username */}
          <p>Hey user</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink exact to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={PlusIcon} alt="add project icon" />
                <span>Add new project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>      
    </div>
  )
}
