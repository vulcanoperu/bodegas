




import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { useStore } from "./core/hooks/useStore"
import { initializeDB } from "../database/adapters/mongodb"

export default function App() {
  const { state, setState } = useStore()

  useEffect(() => {
    initializeDB()
      .then(() => setState({ dbConnected: true }))
      .catch(err => setState({ dbError: err.message }))
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl">Bodega ERP</h1>
      </header>
      <main className="p-4">
        {state.dbConnected ? (
          <p className="text-green-600">Conectado a MongoDB</p>
        ) : (
          <p className="text-red-600">
            {state.dbError || 'Conectando a la base de datos...'}
          </p>
        )}
      </main>
    </div>
  )
}