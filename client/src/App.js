import React from 'react';
import { injectGlobal } from 'styled-components';

import RetailerStoreLocator from './components/RetailStoreLocator';

import styles from './App.scss';

injectGlobal([
  `
  @font-face {
    font-family: 'Verlag-Bold';
    src: url('https://cdn.shopify.com/s/files/1/0658/0121/files/Verlag-Bold.otf');
  }

  @font-face {
    font-family: 'Verlag-Book';
    src: url('https://cdn.shopify.com/s/files/1/0658/0121/files/Verlag-Book.otf');
  }

  @font-face {
    font-family: 'Verlag-XLight';
    src: url('https://cdn.shopify.com/s/files/1/0658/0121/files/Verlag-XLight.otf');
  }

  @font-face {
    font-family: 'Sentinel-Light';
    src: url('https://cdn.shopify.com/s/files/1/0658/0121/files/Sentinel-Light.otf');
  }
  `,
]);

const App = () => (
  <div className={styles.app}>
    <main className={styles.content}>
      <RetailerStoreLocator />
    </main>
  </div>
);

export default App;
