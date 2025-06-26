import { useState, useCallback } from 'react'
import { useStore } from '@nanostores/react'
import {
  countStore,
  todosStore,
  increment,
  decrement,
  incrementByAmount,
  addTodo,
  toggleTodo,
  removeTodo,
  setLoading,
  bulkAddTodos
} from '../stores/nanostores-store'

interface BenchmarkResults {
  renderTime: number
  updateTime: number
  memoryUsage: number
  bundleSize: number
  operationsPerSecond: number
}

interface NanostoresBenchmarkProps {
  onBenchmarkComplete: (results: BenchmarkResults) => void
}

function NanostoresBenchmark({ onBenchmarkComplete }: NanostoresBenchmarkProps) {
  const count = useStore(countStore)
  const todos = useStore(todosStore)
  
  const [newTodoText, setNewTodoText] = useState('')
  const [benchmarkResults, setBenchmarkResults] = useState<BenchmarkResults | null>(null)
  const [isRunningBenchmark, setIsRunningBenchmark] = useState(false)

  // Benchmark de renderização
  const benchmarkRender = useCallback(() => {
    const startTime = performance.now()
    
    // Simular múltiplas renderizações
    for (let i = 0; i < 10000; i++) {
      // Forçar re-render
      incrementByAmount(0)
    }
    
    const endTime = performance.now()
    return endTime - startTime
  }, [])

  // Benchmark de atualizações
  const benchmarkUpdates = useCallback(async () => {
    const startTime = performance.now()
    
    // Simular múltiplas atualizações reais
    for (let i = 0; i < 10000; i++) {
      increment()
      await Promise.resolve()
    }
    
    const endTime = performance.now()
    return endTime - startTime
  }, [])

  // Benchmark de operações por segundo
  const benchmarkOperationsPerSecond = useCallback(() => {
    return new Promise<number>((resolve) => {
      const startTime = performance.now()
      let operations = 0
      
      // Executar operações por 1 segundo
      const interval = setInterval(() => {
        operations++
        increment()
      }, 0)
      
      setTimeout(() => {
        clearInterval(interval)
        const endTime = performance.now()
        const duration = (endTime - startTime) / 1000 // em segundos
        resolve(operations / duration)
      }, 1000)
    })
  }, [])

  // Executar benchmark completo
  const runBenchmark = useCallback(async () => {
    setIsRunningBenchmark(true)
    
    // Limpar estado
    setLoading(true)
    
    // Aguardar um pouco para estabilizar
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const renderTime = benchmarkRender()
    const updateTime = await benchmarkUpdates()
    
    // Simular uso de memória
    const memoryUsage = (performance as any).memory ? (performance as any).memory.usedJSHeapSize : 0
    
    // Bundle size estimado (Nanostores + React adapter)
    const bundleSize = 2.1 // KB
    
    // Operações por segundo
    const opsPerSecond = await benchmarkOperationsPerSecond()
    
    const results: BenchmarkResults = {
      renderTime,
      updateTime,
      memoryUsage,
      bundleSize,
      operationsPerSecond: opsPerSecond
    }
    
    setBenchmarkResults(results)
    onBenchmarkComplete(results)
    setIsRunningBenchmark(false)
    setLoading(false)
  }, [benchmarkRender, benchmarkUpdates, benchmarkOperationsPerSecond, onBenchmarkComplete])

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Nanostores Benchmark</h2>
        <p className="text-gray-600">
          Performance test of Nanostores with React adapter
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Counter */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Counter</h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => decrement()}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              -
            </button>
            <span className="text-2xl font-bold">{count}</span>
            <button
              onClick={() => increment()}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              +
            </button>
          </div>
        </div>

        {/* Add Todo */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Add Todo</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              placeholder="Type a todo..."
              className="flex-1 px-3 py-1 border rounded"
            />
            <button
              onClick={() => {
                if (newTodoText.trim()) {
                  addTodo(newTodoText)
                  setNewTodoText('')
                }
              }}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Todo List */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Todos ({todos.length})</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="rounded"
                />
                <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => removeTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => bulkAddTodos(['Todo 1', 'Todo 2', 'Todo 3', 'Todo 4', 'Todo 5'])}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Add 5 Todos
        </button>
        <button
          onClick={() => {
            for (let i = 0; i < 100; i++) {
              increment()
            }
          }}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Increment 100x
        </button>
      </div>

      {/* Benchmark */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Performance Benchmark</h3>
          <button
            onClick={runBenchmark}
            disabled={isRunningBenchmark}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 disabled:opacity-50"
          >
            {isRunningBenchmark ? 'Running...' : 'Run Benchmark'}
          </button>
        </div>

        {benchmarkResults && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-blue-50 p-3 rounded">
              <div className="text-sm text-blue-600">Render Time</div>
              <div className="text-lg font-bold">{benchmarkResults.renderTime.toFixed(2)}ms</div>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <div className="text-sm text-green-600">Update Time</div>
              <div className="text-lg font-bold">{benchmarkResults.updateTime.toFixed(2)}ms</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded">
              <div className="text-sm text-yellow-600">Memory</div>
              <div className="text-lg font-bold">{(benchmarkResults.memoryUsage / 1024 / 1024).toFixed(2)}MB</div>
            </div>
            <div className="bg-purple-50 p-3 rounded">
              <div className="text-sm text-purple-600">Bundle Size</div>
              <div className="text-lg font-bold">{benchmarkResults.bundleSize}KB</div>
            </div>
            <div className="bg-red-50 p-3 rounded">
              <div className="text-sm text-red-600">Ops/sec</div>
              <div className="text-lg font-bold">{benchmarkResults.operationsPerSecond.toFixed(0)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NanostoresBenchmark 