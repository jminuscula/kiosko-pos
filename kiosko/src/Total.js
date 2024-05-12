
import { useStore } from './store.js';

function getTotal(items) {
    let total = 0;
    for (const item of Object.values(items)) {
        total += item.price;
    }

    total = Math.round(total * 100) / 100;
    return total.toFixed(2);
}

function Total() {
    const items = useStore((state) => state.items);

    return (
        <div>
            <h1>Total</h1>
            <p>{getTotal(items)}€</p>
            <div>{JSON.stringify(items)}</div>
        </div>
    );
}

export default Total;