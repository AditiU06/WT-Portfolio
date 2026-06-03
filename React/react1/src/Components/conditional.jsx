/* export default function Conditional() {
    let message1 = <h1>This is message 1</h1>;
    let message2 = <h1>This is message 2</h1>;
    let message;
    const display = true;
    if(display) {
        message = message1;
    } else {
        message = message2;
    }   
    return (message);
} shift alt A*/

import Welcome from './welcome'
import Code from './code'
export default function Conditional() {
    const display = false;
    if(display) return (<Welcome/>);
    else return (<Code/>);
}