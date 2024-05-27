import Data from './data.json'

import { useStore } from './store.js'
import { useState, useEffect } from 'react'
import { recordSale } from './db.js';


function toAmount(number) {
    return number.toFixed(3).replace(/(\..{2}).*$/, '$1');
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

    const resetSale = useStore((state) => state.resetSale);

    async function handleRecordSale() {
        const sale = {items, sale: {price, discountPct, taxes, total}};
        try {
            await recordSale(sale);
            resetSale();
        } catch (error) {
            console.error("Error recording sale", error);
        }
    };

    return (
        <section id="total">
            <div id="membership"
                onClick={() => setIsMember(!isMember)} className={isMember ? 'member' : ''}>
                <p>member</p>
            </div>
            <div id="subtotal">
                <div>
                    <p>SUBTOTAL … {toAmount(price)}€</p>
                    { discountPct ? (
                        <p>SOCIO {discountPct}% … {toAmount(discountAmount)}€</p>
                    ) : (
                        <p>NO SOCIO</p>
                    )}
                    <p>VAT {Data.settings.vat}% … {toAmount(taxes)}€</p>
                </div>
                <h1 className="amount">{toAmount(total)}€</h1>
            </div>
            <div id="confirm-order" onClick={handleRecordSale}>
                <p>sale</p>
            </div>
        </section>
    );
}

export default Total;