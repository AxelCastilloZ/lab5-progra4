import { useState } from 'react'

import './App.css'

interface Todo {
  //id: number
  description: string
  //isDone: boolean
}

function App() {
  const [todoDescription, setTodoDescription]=useState('')
  const [todoList, setTodoList]=useState<Todo[]>([])

  const handleChnge=(e: any) => {
    setTodoDescription(e.target.value)
  }

  const handleClick=() => {
    const tempTodoList=[...todoList]
    const newTodo={
      description: todoDescription
    }

    tempTodoList.unshift(newTodo)
    setTodoList(tempTodoList)
  }

  return (
    
      <div style={{ border: '1px solid red', padding: 10 }}>

        <div>
          <input
            type='text'
            value={todoDescription}
            onChange={handleChnge}
            style={{ marginRight: 10 }} />
          <button onClick={handleClick}>Add Item</button>
        </div>

        <div>TODOs Here:</div>
        <ul>
          {todoList.map((todo, index) => {
            return <li key={index}>
              <input type='checkbook' />
              {todo.description}
            </li>
          })}
        </ul>

      </div>
    
  )
}

export default App
