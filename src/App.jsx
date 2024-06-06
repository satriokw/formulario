import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='p-8'>
      <p>Get All Forms</p>
      <p>List all forms</p>
      <p>Select on form</p>
      <p>Get selected form model</p>
      <p>Form model</p>
      <p>Button Convert form model into RJSF</p>
    </div>
  )
}

export default App
