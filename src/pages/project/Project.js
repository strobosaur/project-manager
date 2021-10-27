import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';

// CSS STYLES
import './Project.css';

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
      <h1>{document.name}</h1>
    </div>
  )
}
