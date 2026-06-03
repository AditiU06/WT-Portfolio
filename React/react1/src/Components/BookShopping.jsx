import {useState} from "react";

export default function BookShopping(){
    const[bookName,setBookName]=useState("");
    const[price,setPrice]=useState("");
    const[books,setBooks]=useState([]);
    const[cart,setCart]=useState([]);

    function addBook(){
        const newBook = {
            name: bookName,
            price: Number(price)
        };
        setBooks([...books,newBook]);

        setBookName("");
        setPrice("");
    }
//     function deleteBook(id){
//         const updated = cart.filter((emp)=> emp.id!==id
//     );
//     setCart(updated);
//     }
//    function updateBook(id){
//         const upBook= prompt("enter new price");
//         const updated =cart.map(
//             (emp)=> {
//                 if(emp.id==id){
//                     return{
//                         ...emp,
//                         price: Number(upBook)
//                     };
//                 }
//                 return emp;
//             }
//         );
//         setCart(updated);
//     }
   
    function addtoCart(book){
        setCart([...cart,book]);
    }
    const totalbill = cart.reduce(
        (sum,item)=> sum+ item.price,0
    );
    const dis=
    totalbill>2000 ? totalbill*0.1 : 0;

    const finalamt= totalbill-dis;

    return(
        <div className="container">
            <h1>Book Shopping</h1>
            <h2>Admin</h2>
            <input 
            type="text"
            placeholder="Book name"
            value={bookName}
            onChange={(e)=>setBookName(e.target.value)}
            />
            <input 
            type="number"
            placeholder="Book price"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            />
            <button onClick={addBook}>
                Add Book
            </button>

            <h2>Available books</h2>
            <ul>
                {books.map((book,index)=> (
                <li key={index}>
                    {book.name}-{book.price}
                    <button onClick={()=>addtoCart(book)}>
                        Add to cart
                    </button>
                </li>
                ))}
            </ul>

            <h2>Cart Items</h2>
            <ul>
                {cart.map((book,index) => (
                    <li key={index}>
                        {book.name}-{book.price}
                    </li>
                    
                )
            )
                }
            </ul>
            <h2>Total bill: {totalbill}</h2>
             <h2>Discount: {dis}</h2>
              <h2>Total amt: {finalamt}</h2>
        </div>
    );

}
