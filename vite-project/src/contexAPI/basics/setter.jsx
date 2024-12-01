import { useContext, useState } from "react"
import Context from "./contex"

function Setter(){
    const {setValue} = useContext(Context)
    const [input,setInput] = useState("")
    const submit = (e) => {
        e.preventDefault()  //default behavior:- when you submit value goes stemware through URL   
        setValue(input)
    }
    return(
        <>
            <h2>set value</h2>
            <input type="text"  value={input} onChange={(e)=>{setInput(e.target.value)}}/>
            <button onClick={submit}>set value</button>
        </>
    )
}
export default Setter