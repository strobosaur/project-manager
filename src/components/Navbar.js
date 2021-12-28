import { Link, useHistory } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

// CSS STYLES
import './Navbar.css';
import Logo from '../assets/logo01.svg';

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();
  const history = useHistory();
  const handleClickLogo = () => {    
    history.push('/');
  }

  return (
    <div className="navbar">
      <ul>
        <li className="logo" onClick={handleClickLogo}>
          <img src={Logo} alt="page logo" />
          <span>Project manager</span>
        </li>

        { !user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li> 
          </>
        )}

        { user && (
          <li>
            { !isPending && <button className="btn" onClick={logout}>Logout</button> }
            { isPending && <button className="btn" disabled>Logging out...</button> }
          </li>
        )}
      </ul>
    </div>
  )
}
