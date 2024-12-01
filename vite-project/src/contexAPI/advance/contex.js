//do not need to import two files (useContext,context) only import this one 
//combine useContext and context file

import { createContext, useContext } from "react";

export const context = createContext({  //creating context
    themeMode: "light",
    darkTheme:()=>{},
    lightTheme:()=>{}
})

export const ContextProvider = context.Provider //for providing context

export default function useNewContext (){       //for consuming context
    return useContext(context)
}