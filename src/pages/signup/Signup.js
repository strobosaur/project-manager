import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

// CSS STYLES
import './Signup.css';

export default function Signup() {
  // DEFAULT STATES
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageError, setProfileImageError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, userName, profileImage);
  }

  // FUNTION HANDLE IMAGE FILE UPLOADS
  const handleFileUpload = (e) => {
    setProfileImage(null);
    let uploaded = e.target.files[0];
    console.log(uploaded);

    // CHECK FOR NO FILE
    if (!uploaded) {
      setProfileImageError('No file uploaded');
      return;
    }

    // CHECK FOR IMAGE FILE TYPE
    if (!uploaded.type.includes('image')) {
      setProfileImageError('Uploaded file is not an image');
      return;
    }

    // CHECK FILESIZE
    if (uploaded.size > 1000000) {
      setProfileImageError('Image file size is too large (max 1 mb)');
      return;
    }

    // RESET ERROR
    setProfileImageError(null);

    // UPDATE FILE
    setProfileImage(uploaded);
    console.log('profile image updated');
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>
        <span>email:</span>
        <input 
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input 
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>user name:</span>
        <input 
          required
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </label>
      <label>
        <span>profile image:</span>
        <input 
          required
          type="file"
          onChange={handleFileUpload}
        />
        {profileImageError && <div className="error">{profileImageError}</div>}
      </label>
      { !isPending && <button className="btn">Sign Up</button> }
      { isPending && <button className="btn" disabled>Signing Up...</button> }
      { error && <div className="error">{ error }</div> }
    </form>
  )
}