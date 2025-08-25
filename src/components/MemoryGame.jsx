import React, { useState } from 'react'

function MemoryGame() {

    const [grid , setGrid] = useState(4);
    const [cards , setCards] = useState([]);

    const [flipped , setFlipped] = useState([]);
    const [disabled , setDisabled] = useState([]);

    const [won, setWon] = useState();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
        <h1 className='text-3xl font-bold mb-6'>Memory Game</h1>
        {/* Input */}
    </div>
  )
}

export default MemoryGame