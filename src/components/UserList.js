import { useCollection } from '../hooks/useCollection';
import Avatar from './Avatar';

// CSS STYLES
import './UserList.css';

export default function UserList() {
  const { isPending, error, documents } = useCollection('users');

  return (
    <div className="user-list">
      <h2>All users</h2>
      { error && <div className="error">{ error }</div> }
      { isPending && <div>Loading users...</div> }
      { documents && documents.map(user => (
        <div key={user.id} className="user-list-item">
          <span>{user.displayName}</span>
          <Avatar src={user.photoURL} />
        </div>
      ))}
    </div>
  )
}
