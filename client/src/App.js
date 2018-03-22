import React from 'react';

import RetailerStoreLocator from './containers/RetailStoreLocator';

import styles from './App.scss';

const App = () => (
  <div className={styles.app}>
    <main className={styles.content}>
      <RetailerStoreLocator />
    </main>
  </div>
);

export default App;
