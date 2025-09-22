'use client'

import { useCounterStore } from '@/stores/counterStore'

export default function CounterOne() {
  const { count, increment, decrement } = useCounterStore()

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Counter One</h2>
        <div className="text-center">
          <p className="text-4xl font-bold text-primary mb-4">{count}</p>
        </div>
        <div className="card-actions justify-center gap-2">
          <button className="btn btn-success" onClick={increment}>
            +
          </button>
          <button className="btn btn-error" onClick={decrement}>
            -
          </button>
        </div>
      </div>
    </div>
  )
}