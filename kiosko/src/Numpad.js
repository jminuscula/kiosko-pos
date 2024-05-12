
import {useState} from 'react';
import { useStore } from './store.js';


function Numpad() {

    const [isDecimal, setIsDecimal] = useState(false);
    const addAmount = useStore((state) => state.addAmount);
    const selectedQuantity = useStore((state) => state.selectedQuantity);
    const setSelectedQuantity = useStore((state) => state.setSelectedQuantity);

    function addNum(n) {
        const newNum = `${selectedQuantity}${n}`;

        const quantity = Number(newNum);
        if (quantity === Math.round(quantity)) {
            setSelectedQuantity(quantity);
        }
    }

    function addCustomAmount(amount) {
        const price = Number(selectedQuantity);

        if (price > 0) {
            addAmount(price)();
        }
    }

    return (
        <div id="numpad">
            <h1 className="display">
                {selectedQuantity}
            </h1>

            <div onClick={() => addNum("7")} className="num num7">7</div>
            <div onClick={() => addNum("8")} className="num num8">8</div>
            <div onClick={() => addNum("9")} className="num num9">9</div>
            <div onClick={() => addNum("4")} className="num num4">4</div>
            <div onClick={() => addNum("5")} className="num num5">5</div>
            <div onClick={() => addNum("6")} className="num num6">6</div>
            <div onClick={() => addNum("1")} className="num num1">1</div>
            <div onClick={() => addNum("2")} className="num num2">2</div>
            <div onClick={() => addNum("3")} className="num num3">3</div>
            <div onClick={() => addNum("0")} className="num num0">0</div>

            <div onClick={() => setIsDecimal(!isDecimal)}
                 className={"numD " + (isDecimal ? 'active' : '')} >
                .
            </div>

            <div onClick={() => setSelectedQuantity(0)} className="clear">C</div>

            <div onClick={() => addCustomAmount()} className="amount">ADD</div>
        </div>
    )
}

export default Numpad;