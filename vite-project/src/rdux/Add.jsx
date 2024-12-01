import React, { useState } from 'react'
import {useDispatch}  from 'react-redux'
import { addTodo } from './Slice';

export default function Add() {
    const [input, setInput] = useState("");
    const dispatch = useDispatch()  //dispatch uses the reducers to change the value in the store
    function submit(){
        dispatch(addTodo(input))
        setInput("")
    }
  return (
    <>
      <input type="text" value={input} onChange={(e)=>setInput(e.target.value)}/>
      <button onClick={submit}>add</button>
    </>
  )
}
