import { Link } from "react-router-dom"
import { useContext } from "react";
import Context from "./context"
export default function Home(){
    const {setYear} = useContext(Context)

    function setY(y){
        setYear(y)
    }
    return(
        <>
            <Link to="/fy" onClick={()=>setY("fy")}>first year </Link>
            <br />
            <Link to="/it" onClick={()=>setY("it")}>information technology  </Link>
        </>
    )
}