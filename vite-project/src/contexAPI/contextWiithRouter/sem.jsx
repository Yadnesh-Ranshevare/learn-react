import { useContext } from "react"
import Context from "./context"

export default function Sem(){
    const {year} = useContext(Context)
    const {semester} = useContext(Context)
    return(
        <>
            <h2>year: {year}</h2>
            <h3>semester: {semester}</h3>

        </>
    )
}