import React from 'react';

import RetailerMap from './containers/Map';

import styles from './App.scss';

const App = () => (
  <div className={styles.app}>
    <main className={styles.content}>
      <RetailerMap />
    </main>
  </div>
);

export default App;
