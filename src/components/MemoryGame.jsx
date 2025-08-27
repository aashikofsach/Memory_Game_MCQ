import React, { useEffect, useState } from 'react'

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
      let size = parseInt(e.target.value) || "";
     
        setGridSize(size)
    
    }

    function InitializeGame()
    {
        if (gridSize < 2 || gridSize > 10) return; // safety check
      const totalCards = gridSize*gridSize;
      const pairCounts = Math.floor(totalCards/2);
     // make pairs
  const numbers = [...Array(pairCounts).keys()].map((_, index) => index + 1);
  let shuffleCards = [...numbers, ...numbers];

  // if odd, add one extra "lonely" card
  if (totalCards % 2 !== 0) {
    shuffleCards.push(0); // 0 or any special marker
  }

  // shuffle & assign ids
  shuffleCards = shuffleCards
    .sort(() => Math.random() - 0.5)
    .map((number, index) => ({ id: index, number }));
      console.log(shuffleCards)
      setCards(shuffleCards);
      setFlipped([]);
      setSolved([]);
      setWon(false)
    }

   
    useEffect(() => {
    
      InitializeGame();
     
      
    }, [gridSize])
    
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
        <h1 className='text-3xl font-bold mb-6'>Memory Game</h1>
        {/* Input */}
        <div className='mb-4'>
          <label htmlFor="gridSize" className='mr-2'>Grid Size : (max 10)</label>
          <input id='gridSize' type="number" min={2} max={10} value={gridSize} onChange={handleGridChangeSize} className='border-2 border-gray-300 px-2 py-1 rounded-xl' />
        </div>
        {/* gameboard */}
        <div className={`grid gap-2`} style={{gridTemplateColumns : `repeat(${gridSize} , 1fr)` }}>
          {
            cards.map((card)=> <div key={card.id}>{card.number}</div>)
          }
        </div>
    </div>
  )
}

export default MemoryGame