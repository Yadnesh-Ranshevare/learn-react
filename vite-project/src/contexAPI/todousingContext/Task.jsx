import React, { useState } from 'react'
import { useTodo } from './context'
//import SingleTodo from './SIngleTodo'

export default function Task({todo}) {
    const {deleteTodo,isComplete} = useTodo()
    const [updatable,setUpdatable] = useState(true)
    const [value,setValue] = useState(todo.message)
    const [butTxt,setButTxt] = useState("update")
    function toggleUpdate(){
        if(updatable==true){
            setUpdatable(false)
            setButTxt("save")
        }else{
            setUpdatable(true)
            setButTxt("update")
        }
        
    }
    return(
        <>
        <input type="text" readOnly={updatable} value={value} onChange={(e)=>setValue(e.target.value)}/>
        <button onClick={()=>deleteTodo(todo.id)}>delet</button>
        <button onClick={toggleUpdate}>{butTxt}</button>
        <button onClick={()=>isComplete(todo.id)}>done</button>
        </>
    )
//    const {Todos} = useTodo()
//    if(Todos[0]!=undefined){
//         console.log(Todos)
//         return(
//             <div>
//                 {
//                     Todos.map((val,idx)=>(
//                         <>
//                         <p key={idx}>{val.message}</p>
//                         </>
//                     ))
//                 }
//             </div>
//         )
//     }else{
//         return
//     }

  
}
