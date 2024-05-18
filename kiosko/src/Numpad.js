
import { useState } from 'react';
import { useStore } from './store.js';


function Numpad() {

    const [isDecimal, setIsDecimal] = useState(false);
    const addAmount = useStore((state) => state.addAmount);
    const selectedQuantity = useStore((state) => state.selectedQuantity);
    const setSelectedQuantity = useStore((state) => state.setSelectedQuantity);

    function addNum(n) {
        const newNum = isDecimal ? `${selectedQuantity}.${n}` : `${selectedQuantity}${n}`;
        if (newNum.indexOf('.') > 0 && newNum.length - newNum.indexOf('.') -1 > 2) {
            return;
        }

        const quantity = Number(newNum);
        setSelectedQuantity(quantity);

        if (isDecimal) {
            setIsDecimal(false);
        }
    }

    function toggleDecimal() {
        if (`${selectedQuantity}`.indexOf('.') < 0) {
            setIsDecimal(!isDecimal)
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
                {selectedQuantity + (isDecimal ? '.' : '')}
            </h1>

            <button onClick={() => addNum("7")} className="num num7">7</button>
            <button onClick={() => addNum("8")} className="num num8">8</button>
            <button onClick={() => addNum("9")} className="num num9">9</button>
            <button onClick={() => addNum("4")} className="num num4">4</button>
            <button onClick={() => addNum("5")} className="num num5">5</button>
            <button onClick={() => addNum("6")} className="num num6">6</button>
            <button onClick={() => addNum("1")} className="num num1">1</button>
            <button onClick={() => addNum("2")} className="num num2">2</button>
            <button onClick={() => addNum("3")} className="num num3">3</button>
            <button onClick={() => addNum("0")} className="num num0">0</button>

            <button onClick={() => toggleDecimal()}
                 className={"numD " + (isDecimal ? 'active' : '')} >
                .
            </button>

            <button onClick={() => setSelectedQuantity(0)} className="clear">C</button>

            <button onClick={() => addCustomAmount()} className="amount">ADD</button>
        </div>
    )
}

export default Numpad;