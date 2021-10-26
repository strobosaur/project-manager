import { Link } from 'react-router-dom';

// CSS STYLES
import './Navbar.css';
import Logo from '../assets/logo.svg';

export default function Navbar() {
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
          <button className="btn">Logout</button>
        </li>
      </ul>
    </div>
  )
}
