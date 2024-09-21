import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks, setLoading, setError,  setTotalPages, setSearchQuery } from '../../redux/reducers/index';
import BookGrid from '../BookGrid/BookGrid';
import Pagination from '../Pagination/Pagination';
import styles from './BookSearch.module.css';

const BookSearch = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state) => state.books);
  const currentPage = useSelector((state) => state.currentPage);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearch = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    dispatch(setSearchQuery(localSearchQuery));
    // console.log(localSearchQuery);
    // console.log(state,"page curr")
    try {
      console.log("in")
      const response = await fetch(`https://openlibrary.org/search.json?q=${localSearchQuery}&page=${currentPage}&limit=20&fields=key,author_key,currentPage,title,totalPages,cover_i,author_name,editions`);
      
      const data = await response.json();
        // console.log(data,"data")
      dispatch(setBooks(data.docs));
      dispatch(setTotalPages(Math.ceil(data.numFound / 20)));
    } catch (error) {
      dispatch(setError('An error occurred while fetching books'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleInputChange = (e) => {
    setLocalSearchQuery(e.target.value);
  };

  

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={localSearchQuery}
          onChange={handleInputChange}
          
          className={styles.searchInput}
          placeholder="Search for books..."
        />
        <button
          onClick={handleSearch}
          className={styles.searchButton}
        >
          Go
        </button>
      </div>
      <BookGrid />
      <Pagination />
    </div>
  );
};

export default BookSearch;