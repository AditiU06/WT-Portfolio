import { useState } from "react";
export default function Counter() {
    const [count, setCount] = useState(0);
    function handleClick() {
        setCount(count + 1);
    }
    function decrement() {
        setCount(count - 1);
    }
    return (
        <div>
            <h1>Counter: {count}</h1>
            <button onClick={handleClick}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    )   
}