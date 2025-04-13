
import { Todo } from '../types/todo'

const STORAGE_KEY = 'todoList'

export const loadItems = () => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export const saveItems = (items: Todo[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }

