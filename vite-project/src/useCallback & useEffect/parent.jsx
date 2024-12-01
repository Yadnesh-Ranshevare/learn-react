//import React from "react"
import { useCallback, useEffect, useState } from "react"
import Child  from "./child";
function Parent(){
    const [Acount,setACount]= useState(0)
    const [Scount,setSCount] = useState(0)
    let s = 0
    console.log("app")
    function add(){
        setACount(Acount+1);
    }
    function sub(){
        setSCount(Scount+1);
    }
    const h= useCallback(()=>{  //if noy use call back get call every time a button get click
        console.log("k")
    },[Acount])
   // useEffect((h),[Scount])

    
    return (
        <div>
            <h2>add count: {Acount}</h2>
            <button onClick={add}>Add</button>
            <br />
            <Child h={h}/>
            <h2>sub count : {Scount}</h2>
            <button onClick={sub}>Sub</button>
        </div>
    )
}
export default Parent