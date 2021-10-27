import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useCollection } from '../../hooks/useCollection';
import { timestamp } from '../../firebase/fbConfig';
import { useAuthContext } from '../../hooks/useAuthContext';

// CSS STYLES
import './Create.css';

// PROJECT CATEGORIES
const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'finance', label: 'Finance' },
  { value: 'recreation', label: 'Recreation' },
  { value: 'social', label: 'Social' },
]

// MAIN COMPONENT
export default function Create() {
  // DEFAULT STATES
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);

  const [users, setUsers] = useState([]);
  const [formError, setFormError] = useState(null);
  const { user } = useAuthContext();

  // GET USERS FROM DATABASE
  const { documents } = useCollection('users');

  // FORMAT TO FIT REACT SELECT
  useEffect(() => {
    if (documents) {
      const options = documents.map(user => {
        return { value: user, label: user.displayName }
      })
      setUsers(options);
    }
  }, [documents]);

  // FUNCTION HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    // CHECK FOR NO CATEGORY
    if (!category) {
      setFormError('You must select a project category');
      return;
    }

    // CHECK FOR NO ASSIGNED USERS
    if (assignedUsers.length < 1) {
      setFormError('Please assign at least one user to this project');
      return;
    }

    // CREATED BY USER
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    // ASSIGNED USERS LIST
    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })

    // CREATE PROJECT OBJECT
    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    }

    console.log(project);
  }

  // RETURN CREATE PROJECT COMPONENT
  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project name:</span>
          <textarea
            required
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          />
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select 
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>
        <button className="btn">Add project</button>
        { formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}