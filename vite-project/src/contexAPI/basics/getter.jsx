import { useContext } from "react"
import Context from "./contex"

function Getter(){
    const {value} = useContext(Context)
    if(!value){
        return (
            <div>set value</div>
        )
    }else{
        return(
            <div>value = {value}</div>
        )
    }
}
export default Getter