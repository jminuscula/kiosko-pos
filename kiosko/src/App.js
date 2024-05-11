import './App.scss';
import Data from './data.json'
import Catalog from './Catalog.js'
import Numpad from './Numpad.js'

function App() {
  return (
    <main>
      <section id="catalog">
        <Catalog data={Data}></Catalog>
      </section>

      <section id="pos">
        <Numpad></Numpad>
      </section>
    </main>
  );
}

export default App;
