import React, { useState, useEffect } from 'react';
import styles from './AuthorModal.module.css';

const AuthorModal = ({ authorKey, onClose }) => {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await fetch(`https://openlibrary.org/authors/${authorKey}.json`);
        const data = await response.json();
        setAuthor(data);
        console.log(data,"data")
      } catch (error) {
        console.error('Error fetching author data:', error);
      }
    };

    fetchAuthorData();
  }, [authorKey]);

  if (!author) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>
          ✕
        </button>
        <h2 className={styles.authorName}>{author.name}</h2>
        {author.photos && author.photos.length > 0 && (
          <img
            src={`https://covers.openlibrary.org/a/id/${author.photos[0]}-M.jpg`}
            alt={author.name}
            className={styles.authorPhoto}
          />
        )}
        <p className={styles.authorBio}>{author.bio?.value || 'No biography available.'}</p>
      </div>
    </div>
  );
};
export default AuthorModal
