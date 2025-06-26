import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Interface para o estado
interface Todo {
  id: number
  text: string
  completed: boolean
}

interface CounterState {
  count: number
  todos: Todo[]
  isLoading: boolean
}

// Estado inicial
const initialState: CounterState = {
  count: 0,
  todos: [],
  isLoading: false
}

// Slice do contador
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload
    },
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false
      }
      state.todos.push(newTodo)
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(todo => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    bulkAddTodos: (state, action: PayloadAction<string[]>) => {
      const newTodos: Todo[] = action.payload.map((text, index) => ({
        id: Date.now() + index,
        text,
        completed: false
      }))
      state.todos.push(...newTodos)
    },
    resetCounter: (state) => {
      state.count = 0
    }
  }
})

export const {
  increment,
  decrement,
  incrementByAmount,
  addTodo,
  toggleTodo,
  removeTodo,
  setLoading,
  bulkAddTodos,
  resetCounter
} = counterSlice.actions

// Store configurada
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 