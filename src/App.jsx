import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";


function App() {


    const [todos, setTodos]=useState([])
    const [todoValue, setTodosValue] = useState('')

    function parsistData(newList){
      localStorage.setItem('todos', JSON.stringify({todos:
        newList
      }))
    }

      function handleAddTodos(newTodo){
const newTodoList =[...todos, newTodo]
parsistData(newTodoList)
setTodos(newTodoList)
      }
      function handlDeleteTodo(index){
          const newTodoList =todos.filter((todo, todoIndex)=>{
            return todoIndex!== index
          })
          parsistData(newTodoList)

          setTodos(newTodoList)
      }

      function handleEditTodo(index){
        const valueToBeEdited = todos[index]
        setTodosValue(valueToBeEdited)
        handlDeleteTodo(index)
      }
      useEffect(()=>{
        if(!localStorage){
          return
        }

        let localTodos = localStorage.getItem('todos')//ممكن يكون اكو بس فارغ؟
        if(!localTodos){
          return
        }
        
        localTodos=JSON.parse(localTodos).todos
        setTodos(localTodos)
      }, [])
  return (
  <>
 
    <TodoInput todoValue={todoValue}
    setTodosValue={setTodosValue}
     handleAddTodos={handleAddTodos}/>
    <TodoList handleEditTodo={handleEditTodo}
     handleDeleteTodo={handlDeleteTodo}
     todos={todos}/>
  </>
  )
}

export default App;
