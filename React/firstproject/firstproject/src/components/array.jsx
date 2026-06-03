export default function Array() {
const fruits=["apple","banana","grapes","orange"];
return (<div>
    <ul>
        {fruits.map((fruit,index)=>
        (<li key={index}>{fruit}</li>))}
    </ul>
</div> );
}