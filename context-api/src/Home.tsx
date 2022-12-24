import { createContext, useContext, useState } from 'react'

const CycleContext = createContext({} as any)

function CycleForm() {
  const { activeCycle, setActiveCycle } = useContext(CycleContext)
  return (
    <div>
      <h1>Cycle Form: {activeCycle}</h1>
      <button onClick={() => setActiveCycle(activeCycle + 1)}>Incluir Ciclos</button>
    </div>
  )
}

function Countdown() {
  const { activeCycle } = useContext(CycleContext)
  return <h1>Countdown: {activeCycle}</h1>
}

export function Home() {
  const [activeCycle, setActiveCycle] = useState(0)

  return (
    <CycleContext.Provider value={{activeCycle, setActiveCycle}}>
      <div>
        <CycleForm />
        <Countdown />
      </div>
    </CycleContext.Provider>
  )
}