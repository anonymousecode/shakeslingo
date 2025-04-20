import { useState } from 'react'
import './App.css'
import ShakesLingo from './components/shakesLingo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ShakesLingo />
    </>
  )
}

export default App
