import { NavLink } from 'react-router-dom';
import Avatar from './Avatar';
import { useAuthContext } from '../hooks/useAuthContext';

// CSS STYLES
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon3.svg';
import PlusIcon from '../assets/plus_icon3.svg';

export default function Sidebar() {
  const { user } = useAuthContext();

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hey, {user.displayName}</p>
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
