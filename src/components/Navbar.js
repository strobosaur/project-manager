import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

// CSS STYLES
import './Navbar.css';
import Logo from '../assets/logo.svg';

export default function Navbar() {
  const { logout, isPending } = useLogout();

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Logo} alt="page logo" />
          <span>Project manager</span>
        </li>

        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li>
          { !isPending && <button className="btn" onClick={logout}>Logout</button> }
          { isPending && <button className="btn" disabled>Logging out...</button> }
        </li>
      </ul>
    </div>
  )
}
