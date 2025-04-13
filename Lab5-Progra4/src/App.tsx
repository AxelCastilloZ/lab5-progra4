import { useState, useEffect } from 'react'
import { loadItems, saveItems } from './utils/storage'
import { Todo } from './types/Todo'
import './App.css'

function App() {
  const [todoDescription, setTodoDescription] = useState('')
  const [todoList, setTodoList] = useState<Todo[]>([])

  // Se leen las tareas desde localStorage al cargar la app
  useEffect(() => {
    const storedItems = loadItems()
    if (storedItems) {
      setTodoList(storedItems)
    }
  }, [])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoDescription(e.target.value)
  }

  // Crear una nueva tarea
  const handleClick = () => {
    if (!todoDescription.trim()) return

    const newTodo: Todo = {
      id: Date.now(),
      description: todoDescription,
      isDone: false,
      doneAt: null
    }

    const updatedList = [newTodo, ...todoList]
    setTodoList(updatedList)
    saveItems(updatedList) // Guardar en localStorage
    setTodoDescription('')
  }

  // Cambiar estado de completado
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

   
    updatedList.sort((a, b) => Number(a.isDone) - Number(b.isDone))

    setTodoList(updatedList)
    saveItems(updatedList) 
  }

  // Eliminar una tarea
  const deleteTodo = (id: number) => {
    const updatedList = todoList.filter(todo => todo.id !== id)
    setTodoList(updatedList)
    saveItems(updatedList) 
  }

  // Editar una tarea
  const editTodo = (id: number, newDescription: string) => {
    const updatedList = todoList.map(todo =>
      todo.id === id
        ? { ...todo, description: newDescription }
        : todo
    )
    setTodoList(updatedList)
    saveItems(updatedList) 
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
          <li key={todo.id} style={{ marginBottom: '10px' }}>
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={() => toggleDone(todo.id)}
              style={{ marginRight: 10 }}
            />
            <span style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}>
              {todo.description}
            </span>
            {todo.isDone && <small style={{ marginLeft: 10 }}>Fecha: {todo.doneAt}</small>}

            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: 10 }}
            >
              Eliminar
            </button>

            <button
              onClick={() => {
                const newDescription = prompt('Editar tarea:', todo.description)
                if (newDescription !== null && newDescription.trim() !== '') {
                  editTodo(todo.id, newDescription)
                }
              }}
              style={{ marginLeft: 5 }}
            >
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
