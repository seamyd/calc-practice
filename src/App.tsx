import React from 'react';
import { Calculation } from './containers/Calculation';
import styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
          Leer rekenen
      </header>
      <Calculation />
    </div>
  );
}

export default App;
