import './App.scss';
import { getCatalogData } from './db.js'
import Catalog from './Catalog.js'
import Numpad from './Numpad.js'
import Order from './Order.js'
import Total from './Total.js'

import { useState, useEffect } from 'react'


function App() {
    const [catalog, setCatalog] = useState();

    useEffect(() => {
        async function retrieveCatalog() {
            const data = await getCatalogData();
            setCatalog(data);
        }

        if (!catalog) {
            retrieveCatalog();
        }
    }, []);

  return (
    <main>
      <section id="catalog">
        <Catalog data={catalog}></Catalog>
      </section>

      <section id="pos">
        <Numpad></Numpad>
        <Order></Order>
        <Total></Total>
      </section>
    </main>
  );
}

export default App;
