import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ReduxBenchmark from './ReduxBenchmark'
import NanostoresBenchmark from './NanostoresBenchmark'
import BenchmarkResults from './BenchmarkResults'

function BenchmarkApp() {
  const [results, setResults] = useState<{
    redux: any
    nanostores: any
  }>({ redux: null, nanostores: null })

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">
                  Store Benchmark
                </h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Redux
                </Link>
                <Link
                  to="/nanostores"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Nanostores
                </Link>
                <Link
                  to="/results"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Results
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route 
            path="/" 
            element={
              <ReduxBenchmark 
                onBenchmarkComplete={(results) => 
                  setResults(prev => ({ ...prev, redux: results }))
                } 
              />
            } 
          />
          <Route 
            path="/nanostores" 
            element={
              <NanostoresBenchmark 
                onBenchmarkComplete={(results) => 
                  setResults(prev => ({ ...prev, nanostores: results }))
                } 
              />
            } 
          />
          <Route 
            path="/results" 
            element={<BenchmarkResults results={results} />} 
          />
        </Routes>
      </main>
    </div>
  )
}

export default BenchmarkApp 