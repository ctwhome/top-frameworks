
import CounterOne from '@/components/CounterOne'
import CounterTwo from '@/components/CounterTwo'

export default function Home() {
  return (
    <div className="min-h-screen bg-base-300 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Zustand Shared State Demo</h1>
        <p className="text-center mb-8 text-lg">
          Both components share the same counter state. Changes in one will reflect in the other!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CounterOne />
          <CounterTwo />
        </div>
      </div>
    </div>
  );
}
