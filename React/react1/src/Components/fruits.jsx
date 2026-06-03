export default function Fruits(){
    const fruits=["Orange","Banana","Apple","Grapes"];
    return <div>
        <ul>
            {fruits.map(fruit=>
                <li key={fruit}>{fruit}</li>
            )}
        </ul>
    </div>;
}