import { useState } from "react";
import Context from "./contex";

const Provide = ({children})=>{ //children is similar to component 
    const [value,setValue] = useState(null)
    return(
        <Context.Provider value={{value,setValue}}> 
            {children}
        </Context.Provider>
    )
}
export default Provide