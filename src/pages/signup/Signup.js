import { useState } from 'react';

// CSS STYLES
import './Signup.css';

export default function Signup() {
  // DEFAULT STATES
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  return (
    <form className="auth-form">
      <h2>Sign Up</h2>
      <label>
        <span>Email:</span>
        <input 
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input 
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>User name:</span>
        <input 
          required
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </label>
      <label>
        <span>Profile image:</span>
        <input 
          required
          type="file"
        />
      </label>
      <button className="btn">Sign Up</button>
    </form>
  )
}