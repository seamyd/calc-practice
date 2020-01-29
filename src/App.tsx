import React from 'react';
import { Assignment } from './containers/Assignment';
import styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
          Leer rekenen
      </header>
      <Assignment />
    </div>
  );
}

export default App;
