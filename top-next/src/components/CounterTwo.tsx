'use client'

import { useCounterStore } from '@/stores/counterStore'

export default function CounterTwo() {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Counter Two</h2>
        <div className="text-center">
          <p className="text-6xl font-bold text-secondary mb-4">{count}</p>
        </div>
        <div className="card-actions justify-center gap-2">
          <button className="btn btn-outline btn-success" onClick={increment}>
            Increment
          </button>
          <button className="btn btn-outline btn-error" onClick={decrement}>
            Decrement
          </button>
          <button className="btn btn-outline btn-warning" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}