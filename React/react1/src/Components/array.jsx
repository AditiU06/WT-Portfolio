export default function Array() {
  const fruits  = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
  return <div>
  <ul>
    {fruits.map(fruit => 
    <li key={fruit}>{fruit}</li>)}
  </ul>
</div>
    }