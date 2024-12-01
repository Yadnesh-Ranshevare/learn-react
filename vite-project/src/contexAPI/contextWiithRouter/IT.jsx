import { Link } from "react-router-dom";
import { useContext } from "react";
import Context from "./context";
export default function It(){
    const {setSemester} = useContext(Context)
    function setSem(s){
        setSemester(s)
    }
    return(
        <>
            <Link to="/sem" onClick={()=>setSem(3)}>sem3</Link>
            <br />
            <Link to="/sem" onClick={()=>setSem(4)}>sem4</Link>
            <br />
            <Link to="/sem" onClick={()=>setSem(5)}>sem5</Link>
            <br />
            <Link to="/sem" onClick={()=>setSem(6)}>sem6</Link>
            <br />
            <Link to="/sem" onClick={()=>setSem(7)}>sem7</Link>
            <br />
            <Link to="/sem" onClick={()=>setSem(8)}>sem8</Link>
            <br />
        </>
    )
}