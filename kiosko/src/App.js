import './App.scss';
import Data from './data.json'
import Catalog from './Catalog.js'

function App() {
  return (
    <main>
      <section id="catalog">
        <Catalog data={Data}></Catalog>
      </section>

      <section id="pos">
        Point of Sale
      </section>
    </main>
  );
}

export default App;
