import { useState } from 'react'
import CarCanvas from './CarCanvas.jsx'

export default function CustomizerWrapper() {
  const [color, setColor] = useState('gray')

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <button onClick={() => setColor('red')}>Red</button>
        <button onClick={() => setColor('black')}>Black</button>
        <button onClick={() => setColor('white')}>White</button>
      </div>

      <CarCanvas color={color} />
    </div>
  )
}
