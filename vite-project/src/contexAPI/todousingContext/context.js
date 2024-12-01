import { createContext, useContext } from "react";

export const todoContext = createContext({      //inside this create context there can be a default value in this case there is a object   
    Todos:[     //this is array of object each object contain a single todo container 
        {
            id:1,
            message : "",
            completed:false
        }
    ],
    addTodo:(singleTodo)=>{},
    updateTodo:(id,singleTodo)=>{},
    deleteTodo:(id)=>{},
    isComplete:()=>{}
})

export const TodoProvider = todoContext.Provider

export function useTodo(){
    return useContext(todoContext)
}