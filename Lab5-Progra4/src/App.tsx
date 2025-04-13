import { useState, useEffect } from 'react'
import { loadItems, saveItems } from './utils/storage'
import { Todo } from './types/todo'
import './App.css'

function App() {
  const [todoDescription, setTodoDescription] = useState('')
  const [todoList, setTodoList] = useState<Todo[]>([])

  // Se leen las tareas desde localStorage
  useEffect(() => {
    const storedItems = loadItems()
    if (storedItems) {
      setTodoList(storedItems)
    }
  }, [])

  // Guardar tareas en localStorage
  useEffect(() => {
    saveItems(todoList)
  }, [todoList])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoDescription(e.target.value)
  }

  const handleClick = () => {
    if (!todoDescription.trim()) return

    const newTodo: Todo = {
      id: Date.now(),
      description: todoDescription,
      isDone: false,
      doneAt: null
    }

    setTodoList([newTodo, ...todoList])
    setTodoDescription('')
  }

  const toggleDone = (id: number) => {
    const updatedList = todoList.map(todo =>
      todo.id === id
        ? {
            ...todo,
            isDone: !todo.isDone,
            doneAt: !todo.isDone ? new Date().toLocaleString() : null
          }
        : todo
    )

    // Mover las tareas completadas al final de la lista
    updatedList.sort((a, b) => Number(a.isDone) - Number(b.isDone))

    setTodoList(updatedList)
  }

  return (
    <div style={{ border: '1px solid red', padding: 10 }}>
      <div>
        <input
          type="text"
          value={todoDescription}
          onChange={handleChange}
          style={{ marginRight: 10 }}
        />
        <button onClick={handleClick}>Add Item</button>
      </div>

      <div style={{ marginTop: 20 }}>TODOs Here:</div>
      <ul>
        {todoList.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={() => toggleDone(todo.id)}
              style={{ marginRight: 10 }}
            />
            <span style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}>
              {todo.description}
            </span>
            {todo.isDone && <small style={{ marginLeft: 10 }}> Fecha {todo.doneAt}</small>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
//
