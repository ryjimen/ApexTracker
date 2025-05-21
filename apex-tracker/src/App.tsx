import { useState, useEffect } from 'react' // These are the react hooks
import './App.css'
import Connect from './components/Connect'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Connect/>
  )
}

export default App
