import { Outlet } from "react-router-dom";
import Context from "./context";
import { useState } from "react";

export default function Theme(){
    const [semester,setSemester] = useState(null)
    const [year,setYear] = useState(null)
    return(
        <Context.Provider value={{semester,setSemester,year,setYear}}>
            <Outlet/>
        </Context.Provider>
    )
}