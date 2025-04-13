import { Todo } from '../types/Todo'

const STORAGE_KEY = 'todoList'

export const loadItems = (): Todo[] => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? (JSON.parse(data) as Todo[]) : []
}

export const saveItems = (items: Todo[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}
