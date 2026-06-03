import {useState} from "react";

export default function Counter() {
    const [count, setCount] = useState(0);
    function handleClick() {
        setCount(count+1);
    }
    function Decrement() {
        setCount(count-1);
    }
    return(<div>
    <h1>Counter value : {count}</h1>
    <button onClick={handleClick}>Increment</button>
    <button onClick={Decrement}>Decrement</button>
    </div>);
}