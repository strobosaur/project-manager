import { useState } from 'react';
import ProjectList from '../../components/ProjectList';
import { useCollection } from '../../hooks/useCollection';
import ProjectFilter from './ProjectFilter';
import { useAuthContext } from '../../hooks/useAuthContext';

// CSS STYLES
import './Dashboard.css';

export default function Dashboard() {
  const { documents, error } = useCollection('projects');
  const [currentFilter, setCurrentFilter] = useState('all');
  const { user } = useAuthContext();

  // CHANGE PROJECT LIST FILTER
  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  }

  // FILTER PROJECTS FROM DOCUMENT
  const filteredProjects = documents ? documents.filter((document) => {
    switch (currentFilter) {
      // CASE ALL
      case 'all':
        return true;
      // CASE MINE
      case 'mine':
        let assignedToMe = false;
        document.assignedUsersList.forEach((u) => {
          if (user.uid === u.id) {
            assignedToMe = true;
          }
        })
        return assignedToMe;
      // CASE REST
      case 'development':
      case 'design':
      case 'finance':
      case 'recreation':
      case 'social':
        return (document.category === currentFilter);
      // CASE DEFAULT
      default:
        return true;
    }
  }) : null

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      { error && <p className="error">{error}</p> }
      { documents && (
        <ProjectFilter 
          currentFilter={currentFilter} 
          changeFilter={changeFilter} 
        />)}
      { filteredProjects && <ProjectList projects={filteredProjects} /> }
    </div>
  )
}
