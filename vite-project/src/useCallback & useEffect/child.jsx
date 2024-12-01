import {React,memo} from "react"
function Child({h}){
    console.log("child")
    return(
        
        <>
        <button onClick={()=>h(2)}>child</button>
        </>
    )
}
export default memo(Child)