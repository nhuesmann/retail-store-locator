import React from 'react';

import HelloWorld from './components/HelloWorld/HelloWorld';
import MapBasic from './components/Map/Map';
import Marker from './components/Marker/Marker';

import styles from './App.scss';

const App = () => (
  <div className={styles.app}>
    <main className={styles.content}>
      <HelloWorld />
      <MapBasic>
        <Marker lat={34.1562727} lng={-118.3959542} />
      </MapBasic>
    </main>
  </div>
);

export default App;
