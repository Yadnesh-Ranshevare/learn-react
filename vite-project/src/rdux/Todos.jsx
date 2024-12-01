import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeTodo } from './Slice'

export default function Todos() {
    const todos = useSelector(state=>state.myReducer.todos)
    const dispatch = useDispatch()
    

    

  return (
    <>
    {todos.map((eachTodo)=>(
        <li key={eachTodo.id}>
            {eachTodo.txt}
            <button onClick={()=>dispatch(removeTodo(eachTodo.id))}>remove</button>
        </li>
    ))}
    </>
  )
}
