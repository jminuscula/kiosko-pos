
import {useState} from 'react';
import { useStore } from './store.js';


function Numpad() {

    const [num, setNum] = useState("");
    const [isDecimal, setIsDecimal] = useState(false);
    const addAmount = useStore((state) => state.addAmount);

    function addNum(num, n) {
        setNum(num + n);
    }

    function addCustomAmount(amount) {
        const price = Number(num);
        setNum("");
        return addAmount(price)();
    }

    return (
        <div id="numpad">
            <h1 className="display">
                {num || 0}
            </h1>

            <div onClick={() => addNum(num, "7")} className="num num7">7</div>
            <div onClick={() => addNum(num, "8")} className="num num8">8</div>
            <div onClick={() => addNum(num, "9")} className="num num9">9</div>
            <div onClick={() => addNum(num, "4")} className="num num4">4</div>
            <div onClick={() => addNum(num, "5")} className="num num5">5</div>
            <div onClick={() => addNum(num, "6")} className="num num6">6</div>
            <div onClick={() => addNum(num, "1")} className="num num1">1</div>
            <div onClick={() => addNum(num, "2")} className="num num2">2</div>
            <div onClick={() => addNum(num, "3")} className="num num3">3</div>
            <div onClick={() => addNum(num, "0")} className="num num0">0</div>

            <div onClick={() => setIsDecimal(!isDecimal)}
                 className={"numD " + (isDecimal ? 'active' : '')} >
                .
            </div>

            <div onClick={() => setNum("")} className="clear">C</div>

            <div onClick={() => addCustomAmount()} className="amount">ADD</div>
        </div>
    )
}

export default Numpad;