import { atom, computed } from 'nanostores'

// Interfaces
interface Todo {
  id: number
  text: string
  completed: boolean
}

interface AppState {
  count: number
  todos: Todo[]
  isLoading: boolean
}

// Estado inicial
const initialState: AppState = {
  count: 0,
  todos: [],
  isLoading: false
}

// Store principal
export const appStore = atom<AppState>(initialState)

// Stores individuais para melhor performance
export const countStore = atom(initialState.count)
export const todosStore = atom<Todo[]>(initialState.todos)
export const loadingStore = atom(initialState.isLoading)

// Computed stores
export const completedTodosStore = computed(todosStore, (todos) => 
  todos.filter(todo => todo.completed)
)

export const pendingTodosStore = computed(todosStore, (todos) => 
  todos.filter(todo => !todo.completed)
)

export const todosCountStore = computed(todosStore, (todos) => todos.length)

// Actions
export function increment() {
  countStore.set(countStore.get() + 1)
}

export function decrement() {
  countStore.set(countStore.get() - 1)
}

export function incrementByAmount(amount: number) {
  countStore.set(countStore.get() + amount)
}

export function addTodo(text: string) {
  const newTodo: Todo = {
    id: Date.now(),
    text,
    completed: false
  }
  todosStore.set([...todosStore.get(), newTodo])
}

export function toggleTodo(id: number) {
  const todos = todosStore.get()
  const updatedTodos = todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  )
  todosStore.set(updatedTodos)
}

export function removeTodo(id: number) {
  const todos = todosStore.get()
  const filteredTodos = todos.filter(todo => todo.id !== id)
  todosStore.set(filteredTodos)
}

export function setLoading(isLoading: boolean) {
  loadingStore.set(isLoading)
}

export function bulkAddTodos(texts: string[]) {
  const currentTodos = todosStore.get()
  const newTodos: Todo[] = texts.map((text, index) => ({
    id: Date.now() + index,
    text,
    completed: false
  }))
  todosStore.set([...currentTodos, ...newTodos])
}

export function resetCounter() {
  countStore.set(0)
}

// Função para sincronizar stores individuais com a store principal
export function syncStores() {
  appStore.set({
    count: countStore.get(),
    todos: todosStore.get(),
    isLoading: loadingStore.get()
  })
}

// Listeners para manter sincronização
countStore.listen(() => syncStores())
todosStore.listen(() => syncStores())
loadingStore.listen(() => syncStores()) 