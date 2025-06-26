interface BenchmarkResults {
  renderTime: number
  updateTime: number
  memoryUsage: number
  bundleSize: number
  operationsPerSecond: number
}

interface BenchmarkResultsProps {
  results: {
    redux: BenchmarkResults | null
    nanostores: BenchmarkResults | null
  }
}

function BenchmarkResults({ results }: BenchmarkResultsProps) {
  const { redux, nanostores } = results

  if (!redux || !nanostores) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Benchmark Results</h2>
        <p className="text-gray-600">
          Run the Redux and Nanostores benchmarks to see comparative results.
        </p>
      </div>
    )
  }

  // Calcular diferenças percentuais
  const calculateDifference = (reduxValue: number, nanostoresValue: number) => {
    const diff = ((nanostoresValue - reduxValue) / reduxValue) * 100
    return diff
  }

  const renderTimeDiff = calculateDifference(redux.renderTime, nanostores.renderTime)
  const updateTimeDiff = calculateDifference(redux.updateTime, nanostores.updateTime)
  const memoryDiff = calculateDifference(redux.memoryUsage, nanostores.memoryUsage)
  const bundleSizeDiff = calculateDifference(redux.bundleSize, nanostores.bundleSize)
  const opsDiff = calculateDifference(redux.operationsPerSecond, nanostores.operationsPerSecond)

  const getWinner = (diff: number, lowerIsBetter: boolean = true) => {
    if (diff === 0) return 'tie'
    const isNanostoresBetter = lowerIsBetter ? diff < 0 : diff > 0
    return isNanostoresBetter ? 'nanostores' : 'redux'
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Comparative Results</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Redux Results */}
        <div className="bg-red-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-red-800 mb-4">Redux Toolkit</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-red-700">Render Time:</span>
              <span className="font-bold">{redux.renderTime.toFixed(2)}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-700">Update Time:</span>
              <span className="font-bold">{redux.updateTime.toFixed(2)}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-700">Memory:</span>
              <span className="font-bold">{(redux.memoryUsage / 1024 / 1024).toFixed(2)}MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-700">Bundle Size:</span>
              <span className="font-bold">{redux.bundleSize}KB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-700">Ops/sec:</span>
              <span className="font-bold">{redux.operationsPerSecond.toFixed(0)}</span>
            </div>
          </div>
        </div>

        {/* Nanostores Results */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Nanostores</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-blue-700">Render Time:</span>
              <span className="font-bold">{nanostores.renderTime.toFixed(2)}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Update Time:</span>
              <span className="font-bold">{nanostores.updateTime.toFixed(2)}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Memory:</span>
              <span className="font-bold">{(nanostores.memoryUsage / 1024 / 1024).toFixed(2)}MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Bundle Size:</span>
              <span className="font-bold">{nanostores.bundleSize}KB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Ops/sec:</span>
              <span className="font-bold">{nanostores.operationsPerSecond.toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Metric</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Redux</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Nanostores</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Difference</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Winner</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Render Time</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{redux.renderTime.toFixed(2)}ms</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{nanostores.renderTime.toFixed(2)}ms</td>
              <td className={`border border-gray-300 px-4 py-2 text-center ${renderTimeDiff < 0 ? 'text-green-600' : 'text-red-600'}`}>
                {renderTimeDiff > 0 ? '+' : ''}{renderTimeDiff.toFixed(1)}%
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  getWinner(renderTimeDiff) === 'nanostores' 
                    ? 'bg-green-100 text-green-800' 
                    : getWinner(renderTimeDiff) === 'redux'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {getWinner(renderTimeDiff) === 'nanostores' ? 'Nanostores' : 
                   getWinner(renderTimeDiff) === 'redux' ? 'Redux' : 'Tie'}
                </span>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Update Time</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{redux.updateTime.toFixed(2)}ms</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{nanostores.updateTime.toFixed(2)}ms</td>
              <td className={`border border-gray-300 px-4 py-2 text-center ${updateTimeDiff < 0 ? 'text-green-600' : 'text-red-600'}`}>
                {updateTimeDiff > 0 ? '+' : ''}{updateTimeDiff.toFixed(1)}%
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  getWinner(updateTimeDiff) === 'nanostores' 
                    ? 'bg-green-100 text-green-800' 
                    : getWinner(updateTimeDiff) === 'redux'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {getWinner(updateTimeDiff) === 'nanostores' ? 'Nanostores' : 
                   getWinner(updateTimeDiff) === 'redux' ? 'Redux' : 'Tie'}
                </span>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Memory</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{(redux.memoryUsage / 1024 / 1024).toFixed(2)}MB</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{(nanostores.memoryUsage / 1024 / 1024).toFixed(2)}MB</td>
              <td className={`border border-gray-300 px-4 py-2 text-center ${memoryDiff < 0 ? 'text-green-600' : 'text-red-600'}`}>
                {memoryDiff > 0 ? '+' : ''}{memoryDiff.toFixed(1)}%
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  getWinner(memoryDiff) === 'nanostores' 
                    ? 'bg-green-100 text-green-800' 
                    : getWinner(memoryDiff) === 'redux'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {getWinner(memoryDiff) === 'nanostores' ? 'Nanostores' : 
                   getWinner(memoryDiff) === 'redux' ? 'Redux' : 'Tie'}
                </span>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Bundle Size</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{redux.bundleSize}KB</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{nanostores.bundleSize}KB</td>
              <td className={`border border-gray-300 px-4 py-2 text-center ${bundleSizeDiff < 0 ? 'text-green-600' : 'text-red-600'}`}>
                {bundleSizeDiff > 0 ? '+' : ''}{bundleSizeDiff.toFixed(1)}%
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  getWinner(bundleSizeDiff) === 'nanostores' 
                    ? 'bg-green-100 text-green-800' 
                    : getWinner(bundleSizeDiff) === 'redux'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {getWinner(bundleSizeDiff) === 'nanostores' ? 'Nanostores' : 
                   getWinner(bundleSizeDiff) === 'redux' ? 'Redux' : 'Tie'}
                </span>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Ops/sec</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{redux.operationsPerSecond.toFixed(0)}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{nanostores.operationsPerSecond.toFixed(0)}</td>
              <td className={`border border-gray-300 px-4 py-2 text-center ${opsDiff > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {opsDiff > 0 ? '+' : ''}{opsDiff.toFixed(1)}%
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  getWinner(opsDiff, false) === 'nanostores' 
                    ? 'bg-green-100 text-green-800' 
                    : getWinner(opsDiff, false) === 'redux'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {getWinner(opsDiff, false) === 'nanostores' ? 'Nanostores' : 
                   getWinner(opsDiff, false) === 'redux' ? 'Redux' : 'Tie'}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Redux Toolkit</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• More mature and widely adopted</li>
              <li>• Robust development tools</li>
              <li>• Well-established pattern</li>
              <li>• Larger bundle size</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Nanostores</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Extremely lightweight</li>
              <li>• Simple and intuitive API</li>
              <li>• Optimized performance</li>
              <li>• Smaller bundle size</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BenchmarkResults 