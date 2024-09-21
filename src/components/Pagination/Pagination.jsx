import React, {  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/reducers/index';
import styles from './Pagination.module.css';
import { setBooks, setLoading, setError,  setTotalPages } from '../../redux/reducers/index';

const Pagination = () => {
  const dispatch = useDispatch();
  const  currentPage = useSelector((state) => state.currentPage);
  const totalPages  = useSelector((state) => state.totalPages);
  const  searchQuery  = useSelector((state) => state.searchQuery);
  
  // console.log(currentPage, totalPages,"page")
  const apical=async(currentPage)=>{
    try {
      console.log("in")
      const response = await fetch(`https://openlibrary.org/search.json?q=${searchQuery}&page=${currentPage}&limit=20&fields=key,author_key,currentPage,title,totalPages,cover_i,author_name,editions`);
      
      const data = await response.json();
        // console.log(data,"data")
      dispatch(setBooks(data.docs));

      dispatch(setTotalPages(Math.ceil(data.numFound / 20)));
    } catch (error) {
      dispatch(setError('An error occurred while fetching books'));
    } finally {
      dispatch(setLoading(false));
    }
  }
  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
    apical( currentPage)
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
    apical( currentPage)
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`${styles.button} ${currentPage === 1 ? styles.disabled : ''}`}
      >
        Prev
      </button>
      <span>{currentPage}</span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`${styles.button} ${currentPage === totalPages ? styles.disabled : ''}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
