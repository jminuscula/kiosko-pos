import Data from './data.json'

import { useStore } from './store.js'
import { useState, useEffect } from 'react'
import { recordSale } from './db.js';


function toAmount(number) {
    return number.toFixed(3).replace(/(\..{2}).*$/, '$1');
}

function getTotal(items) {
    let price = 0;
    for (const item of Object.values(items)) {
        price += item.price;
    }

    return price;
}

function getTaxes(items, defaultVat) {
    let totalTax = 0;
    let itemVat;
    for (const item of Object.values(items)) {
        itemVat = item.vat || defaultVat;
        totalTax += item.price * (itemVat / 100);
    }

    return totalTax;
}

function Total() {
    const items = useStore((state) => state.items);
    const [isMember, setIsMember] = useState(false);
    const discountPct = isMember ? Data.settings.membershipDiscount : 0;

    const total = getTotal(items);
    const taxes = getTaxes(items, Data.settings.vat);
    const discount = total * (discountPct / 100);
    const grandTotal = total - discount;

    const resetSale = useStore((state) => state.resetSale);

    async function handleRecordSale() {
        if (!items.length) {
            return;
        }

        const sale = {items, sale: {total, discountPct, taxes}};
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
                    <p>SUBTOTAL … {toAmount(total)}€</p>
                    <p>VAT inc … {toAmount(taxes)}€</p>
                    { discountPct ? (
                        <p>MEMBER {discountPct}% … {toAmount(discount)}€</p>
                    ) : (
                        <p>NOT MEMBER</p>
                    )}
                </div>
                <h1 className="amount">{toAmount(grandTotal)}€</h1>
            </div>
            <div id="confirm-order" onClick={handleRecordSale} className={items.length ? '' : 'disabled'}>
                <p>sale</p>
            </div>
        </section>
    );
}

export default Total;