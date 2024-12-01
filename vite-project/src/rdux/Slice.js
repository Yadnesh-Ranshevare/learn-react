import { createSlice,nanoid } from "@reduxjs/toolkit"; //nanoid is use to create unique id

const initialState ={
    todos:[{id:1,txt:"hello"}]
}

export const Slice=createSlice({
    name:"todoUsingReducer",        //it is name of a slide 'name' is inbuilt property and 'todo(it can be anything you wantS)' is the name of the slice
    initialState,
    reducers:{
        addTodo: (state,action)=>{    //state gives current sate of the store, action are the parameter that are passes in to the method
            const todo ={ 
                id:nanoid(),
                txt:action.payload  //payload is an object that contain all the parameter
            }
            state.todos.push(todo)  //to push this todo into our state
        },
        removeTodo:(state,action)=>{
            state.todos = state.todos.filter((eachTodo)=>eachTodo.id != action.payload)
        }
    }
}) 

export const {addTodo,removeTodo} = Slice.actions   //as this method are in useful in component we need to export them individually 

export default Slice.reducer    //as store need the info of our reducer we need to export them (this is myReducer)