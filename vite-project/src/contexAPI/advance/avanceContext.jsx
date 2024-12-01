import { useState } from "react";
import But from "./button";
import { ContextProvider } from "./contex";

export default function AdvanceContext(){
    const[themeMode,setThemeMode]=useState("light")
    function darkTheme(){
        setThemeMode("dark")
    }
    function lightTheme(){
        setThemeMode("light")
    }
    return(
        <>
        <ContextProvider value={{themeMode,darkTheme,lightTheme}}>
            <h3>{themeMode}</h3>
            <But/>
        </ContextProvider>
        </>
    )
}