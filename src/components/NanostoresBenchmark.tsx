import { useState, useCallback } from 'react'
import { useStore } from '@nanostores/react'
import {
  countStore,
  increment,
  decrement,
  incrementByAmount,
  setLoading,
  resetCounter
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
  
  const [benchmarkResults, setBenchmarkResults] = useState<BenchmarkResults | null>(null)
  const [isRunningBenchmark, setIsRunningBenchmark] = useState(false)

  // Benchmark de renderização
  const benchmarkRender = useCallback(() => {
    resetCounter()
    const startTime = performance.now()
    for (let i = 0; i < 1000; i++) {
      increment()
    }
    const endTime = performance.now()
    return endTime - startTime
  }, [])

  // Benchmark de atualizações
  const benchmarkUpdates = useCallback(async () => {
    resetCounter()
    const startTime = performance.now()
    for (let i = 0; i < 1000; i++) {
      increment()
      await Promise.resolve()
    }
    const endTime = performance.now()
    return endTime - startTime
  }, [])

  // Benchmark de operações por segundo
  const benchmarkOperationsPerSecond = useCallback(() => {
    resetCounter()
    return new Promise<number>((resolve) => {
      const startTime = performance.now()
      let operations = 0
      const interval = setInterval(() => {
        operations++
        increment()
      }, 0)
      setTimeout(() => {
        clearInterval(interval)
        const endTime = performance.now()
        const duration = (endTime - startTime) / 1000
        resolve(operations)
      }, 30000)
    })
  }, [])

  // Executar benchmark completo
  const runBenchmark = useCallback(async () => {
    setIsRunningBenchmark(true)
    // Resetar o contador antes do benchmark
    resetCounter()
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 100))
    const renderTime = benchmarkRender()
    const updateTime = await benchmarkUpdates()
    const memoryUsage = (performance as any).memory ? (performance as any).memory.usedJSHeapSize : 0
    const bundleSize = 2.1 // KB
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

      <div className="mb-6">
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
          </div>
        )}
      </div>
    </div>
  )
}

export default NanostoresBenchmark 