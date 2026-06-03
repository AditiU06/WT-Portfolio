// export default function ConditionalComponents(){
//     let msgOne=<h1>Message 1</h1>;
//     let msgTwo=<h1>Message 2</h1>;
//     let msg;
//     const display = false;
//     if (display){
//         msg=msgOne;
//     }else{
//         msg=msgTwo;
//     }
//     return (msg);
// }

import Code from './Code';
import Welcome from './Welcome';

export default function ConditionalComponents(){
    const display = false;
    if(display)
        return <Welcome />;
    else
        return <Code/>;
}