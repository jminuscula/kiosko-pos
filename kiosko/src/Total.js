import Data from './data.json'
import { useStore } from './store.js'
import { useState } from 'react'

function toAmount(number) {
    let amount = Math.round(number * 1000) / 1000;
    return amount.toFixed(2);
}

function getPrice(items) {
    let price = 0;
    for (const item of Object.values(items)) {
        price += item.price;
    }

    return price;
}

function getSubtotal(price, discount) {
    return price - (price * (discount / 100));
}

function getTaxes(subtotal, vat) {
    return subtotal * (vat / 100);
}

function getTotal(subtotal, taxes) {
    return subtotal + taxes;
}

function Total() {
    const items = useStore((state) => state.items);
    const [isMember, setIsMember] = useState(false);
    const discountPct = isMember ? Data.settings.membershipDiscount : 0;

    const price = getPrice(items);
    const subtotal = getSubtotal(price, discountPct);
    const discountAmount = price - subtotal;
    const taxes = getTaxes(subtotal, Data.settings.vat);
    const total = getTotal(subtotal, taxes);

    return (
        <section id="total">
            <div id="membership"
                onClick={() => setIsMember(!isMember)} className={isMember ? 'member' : ''}>
                <p>member</p>
            </div>
            <div id="subtotal">
                <div>
                    <p>SUBTOTAL … {toAmount(subtotal)}€</p>
                    <p>VAT {Data.settings.vat}% … {toAmount(taxes)}€</p>
                    { discountPct ? (
                        <p>SOCIO {discountPct}% … {toAmount(discountAmount)}€</p>
                    ) : (
                        <p>NO SOCIO</p>
                    )}
                </div>
                <h1 cassName="amount">{toAmount(total)}€</h1>
            </div>
            <div id="confirm-order">
                <p>sale</p>
            </div>
        </section>
    );
}

export default Total;