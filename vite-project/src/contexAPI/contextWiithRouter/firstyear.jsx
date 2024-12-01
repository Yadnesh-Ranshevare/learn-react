import { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "./context";
export default function Firstyear(){
    const {setSemester} = useContext(Context)
    function setSem(s){
        setSemester(s)
    }
    return(
        <>
            <Link to = "/sem" onClick={()=>setSem(1)}>sem1</Link>
            <br />
            <Link to = "/sem" onClick={()=>setSem(2)}>sem2</Link>
        </>
    )
}