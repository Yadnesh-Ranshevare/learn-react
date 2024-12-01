import React, { useEffect } from 'react'
import { TodoProvider } from './context';
import { useState } from 'react'
import EnterTodo from './EnterTodo';
import Task from './Task';

function TodoUsingContext() {
  const [Todos, setTodos] = useState([]); //since todo is an array default value will be an empty array
  function addTodo(singleTodo){
    //console.log(singleTodo)
    setTodos(prevTodos => [...prevTodos,  {...singleTodo,completed:false} ]);
  }
  function deleteTodo(id){
    setTodos((prev)=>prev.filter((Todos)=>Todos.id!==id))
  }
  function isComplete(id){
    console.log(id)
    setTodos((prev)=>prev.map((val)=>((val.id===id) ? {...val, completed: !val.completed} : val )))
  }
  useEffect(() => {
    console.log(Todos); // Logs updated Todos whenever the state changes
}, [Todos]);

  useEffect(()=>{ //to get data stored in local storage,data store in a string formant so first convert it into the json
    const todosInLocalStorage = JSON.parse(localStorage.getItem("Todos")) //use key to retrieve the data
    if(todosInLocalStorage && todosInLocalStorage.length>0){
      setTodos(todosInLocalStorage)
    }
  },[])
  useEffect(()=>{   //to store data in local storage convert json to string
    localStorage.setItem("Todos",JSON.stringify(Todos))     //data stored in a key value pair
  },[Todos])


  return (
    <>
      <TodoProvider value={{Todos,addTodo,deleteTodo,isComplete}}>
        <EnterTodo/>
        {
            Todos.map((val)=>(
                <div>
                  <Task key={val.id} todo ={val}/>
                </div>
            ))
        }
        
      </TodoProvider>
    </>
  )
}

export default TodoUsingContext

