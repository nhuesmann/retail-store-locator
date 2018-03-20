import React from 'react';

import RetailerStoreLocator from './components/RetailStoreLocator/RetailStoreLocator';

import styles from './App.scss';

const App = () => (
  <div className={styles.app}>
    <main className={styles.content}>
      <RetailerStoreLocator />
    </main>
  </div>
);

export default App;
