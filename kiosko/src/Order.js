
import { useStore } from './store.js';


function Order(){
    const items = useStore((state) => state.items);
    const removeItem = useStore((store) => store.removeItem);

    function OrderItem(idx, item) {
        return (
            <article key={`order-item-${idx}`} className="order-item">
                <p className="order-item-number">{idx + 1}.</p>
                <p className="order-item-name">{item.name}</p>
                <p className="order-item-price">{item.price.toFixed(2)}€</p>
                <button className="order-item-remove" onClick={removeItem(idx)}>x</button>
            </article>
        );
    }

    return (
        <section id="order">
            {items.map((i, idx) => OrderItem(idx, i))}
        </section>
    );
}

export default Order;
