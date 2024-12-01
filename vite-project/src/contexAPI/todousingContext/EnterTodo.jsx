import React, { useState } from 'react'
import { useTodo } from './context'

export default function () {
    const {addTodo} = useTodo()
    const [message,setMessage]=useState("")
    const submit=(e)=>{
        e.preventDefault()
        if(!message){
            return
        }else{
            addTodo({id:Date.now(),message: message})
            setMessage("")
        }
    }
  return (
    <div>
        <input type="text" onChange={(e)=>setMessage(e.target.value)} value={message}/>
        <button onClick={submit}>add</button>
    </div>
  )
}
