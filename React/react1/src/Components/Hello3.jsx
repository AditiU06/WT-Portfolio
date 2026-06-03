import Hello from "./Hello";
function Hello3({person}) {

    return <h1>{person.message}, {person.name} - Seat Numbers: {person.SeatNumbers}</h1>;
}
export default Hello3;
