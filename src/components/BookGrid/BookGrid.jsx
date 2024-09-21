import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AuthorModal from '../AuthorModal/AuthorModal';
import styles from './BookGrid.module.css';

const BookGrid = () => {
  const books= useSelector((state) => state.books);
  const loading= useSelector((state) => state.loading);
  const error= useSelector((state) => state.error);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }
  // console.log(selectedAuthor)
  // console.log(state.author_key,"books")
  if (!books) {
    return <div className={styles.noResults}>No books found. Try a different search.</div>;
  }

  const handleAuthorClick = (authorKey) => {
    setSelectedAuthor(authorKey);
  };

  const closeModal = () => {
    setSelectedAuthor(null);
  };

  return (
    <div>
      <div className={styles.grid}>
        {books.map((book) => (
          <div key={book.key} className={styles.book}>
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt={book.title}
              className={styles.cover}
            />
            <h3 className={styles.title}>{book.title}</h3>
            {book.author_name && (
              <button
                onClick={() => handleAuthorClick(book.author_key[0])}
                className={styles.author}
              >
                {book.author_name[0]}
              </button>
            )}
          </div>
        ))}
      </div>
      {selectedAuthor && (
        <AuthorModal authorKey={selectedAuthor} onClose={closeModal} />
      )}
    </div>
  );
};

export default BookGrid