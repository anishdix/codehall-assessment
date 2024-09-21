


import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import BookSearch from './components/BookSearch/BookSearch';
import styles from './App.module.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className={styles.app}>
        <h1 className={styles.title}>Book Search</h1>
        <BookSearch />
      </div>
    </Provider>
  );
};

export default App;

