import { useState } from "react";

export default function Form()
    {
        const [name, setName]= useState("")
        const [lastname, setLastname]= useState("")
        const [password, setPass]= useState("")
        // function handleChange(e){
        //     setName(e.target.value)
        // }
        return <div>
            <form>
                Name: <input onChange={(e)=>setName(e.target.value)} type="text" value = {name}/><br/>
                Last Name: <input onChange={(e)=>setLastname(e.target.value)} type="text" value = {lastname}/><br/>
                Password: <input onChange={(e)=>setPass(e.target.value)} type="password" value = {password}/><br/>
                <input type="submit" value="Submit"/>
                
            </form>

            {name}
            {lastname}
            {password}
        </div>
    }