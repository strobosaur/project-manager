import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import ProjectComments from './ProjectComments';

// CSS STYLES
import './Project.css';
import ProjectSummary from './ProjectSummary';

export default function Project() {
  const { id } = useParams();
  const { error, document } = useDocument('projects', id);

  // CHECK FOR ERRORS
  if (error) {
    return <div className="error">{error}</div>
  }

  // CHECK FOR NO DOCUMENT
  if (!document) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="project-details">
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </div>
  )
}
