import { useState } from 'react';
import { timestamp } from '../../firebase/fbConfig';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';

export default function ProjectComments({ project }) {
  const { updateDocument, response } = useFirestore('projects');
  const [newComment, setNewComment] = useState('');
  const { user } = useAuthContext();

  // FUNCTION HANDLE SUBMIT COMMENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // CREATE COMMENT OBJECT
    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random()
    }

    // ADD COMMENT TO PROJECT DOCUMENT IN DB
    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd]
    });
    // RESET NEW COMMENT STATE
    if (!response.error) {
      setNewComment('');
    }
  }

  return (
    <div className="project-comments">
      <h4>Project Comments</h4>

      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Post Comment</button>
      </form>      
    </div>
  )
}
