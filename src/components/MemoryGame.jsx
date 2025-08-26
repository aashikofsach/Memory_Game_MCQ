import React, { useState } from 'react'

function MemoryGame() {

    const [gridSize , setGridSize] = useState(4);
    const [cards , setCards] = useState([]);

    const [flipped , setFlipped] = useState([]);
    const [solved , setSolved] = useState([])
    const [disabled , setDisabled] = useState([]);

    const [won, setWon] = useState();

    function handleGridChangeSize(e)
    {
      // console.log("jai ")
      // console.log(typeof(e.target.value))
      let size = parseInt(e.target.value);
      if(size >= 2 && size <=10)
        setGridSize(size)
    
    }

    function InitializeGame()
    {
      const totalCards = gridSize*gridSize;
      const pairCounts = Math.floor(totalCards/2);
      const numbers = [...Array(pairCounts).keys()].map((_ , index) => index +1)
      // console.log(numbers);
      const shuffleCards = [...numbers, ...numbers].sort(()=> Math.random()-0.5).map((number , index)=> ({id: index , number}))
      console.log(shuffleCards)
      setCards(shuffleCards);
      setFlipped([]);
      setSolved([]);
      setWon(false)
    }

    InitializeGame() ;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
        <h1 className='text-3xl font-bold mb-6'>Memory Game</h1>
        {/* Input */}
        <div className='mb-4'>
          <label htmlFor="gridSize" className='mr-2'>Grid Size : (max 10)</label>
          <input id='gridSize' type="number" min={2} max={10} value={gridSize} onChange={(e)=>handleGridChangeSize(e)} className='border-2 border-gray-300 px-2 py-1 rounded-xl' />
        </div>
    </div>
  )
}

export default MemoryGame