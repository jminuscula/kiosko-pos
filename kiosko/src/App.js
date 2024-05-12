import './App.scss';
import Data from './data.json'
import Catalog from './Catalog.js'
import Numpad from './Numpad.js'
import Order from './Order.js'
import Total from './Total.js'

function App() {
  return (
    <main>
      <section id="catalog">
        <Catalog data={Data}></Catalog>
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
