import React, { useEffect, useState } from 'react'

function MemoryGame() {

  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);

  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([])
  const [movesCount, setMovesCount] = useState(0);
  const [lost, setLost] = useState(false);
  const [maxMoves, setMaxMoves] = useState(10)


  const [won, setWon] = useState(false);

  function handleGridChangeSize(e) {
    // console.log("jai ")
    // console.log(typeof(e.target.value))
    let size = parseInt(e.target.value) || "";

    setGridSize(size)

  }

  function InitializeGame() {
    if (gridSize < 2 || gridSize > 10) return; // safety check
    const totalCards = gridSize * gridSize;
    const pairCounts = Math.floor(totalCards / 2);
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
    setLost(false);
    setMovesCount(0);

  }


  useEffect(() => {

    InitializeGame();


  }, [gridSize]);

  function checkMatch(secondId) {
    let [firstId] = flipped;

    setMovesCount((prev) => {
      const newMoves = prev + 1;

      if (newMoves >= maxMoves && maxMoves > 0) {
        setLost(true)
      }

      return newMoves;
    })
    if (cards[firstId].number === cards[secondId].number) {
      setSolved([...solved, firstId, secondId])
      setFlipped([])
      console.log("matched", solved)
    }
    else {
      setTimeout(() => {
        setFlipped([])
      }, 1000)
    }

  }


  function handleClick(id) {

    if (flipped.length === 0) {
      setFlipped([id])
      return;
    }
    if (flipped.length === 1) {
      // setDisabled(true)
      if (id !== flipped[0]) {
        setFlipped([...flipped, id])
        //check match or not 
        checkMatch(id)
      }
      else {
        setFlipped([]);
        // setDisabled(false)
      }
    }

  }
  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0)
      setWon(true)


  }, [solved, cards.length])


  const isFlipped = (id) => {

    return flipped.includes(id) || solved.includes(id)

  }

  const isSolved = (id) => solved.includes(id);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
      <h1 className='text-3xl font-bold mb-6'>Memory Game</h1>
      {/* Input */}
      <div className='mb-4'>
        <label htmlFor="gridSize" className='mr-2'>Grid Size : (max 10)</label>
        <input id='gridSize' type="number" min={2} max={10} value={gridSize} onChange={handleGridChangeSize} className='border-2 border-gray-300 px-2 py-1 rounded-xl mr-2' />
      </div>
      <div className='mb-4'>
        <label htmlFor="maxMoves" className='mr-2'>Max Moves (0 = unlimited): </label>
        <input
          id='maxMoves'
          type="number"
          min={0}
          value={maxMoves}
          onChange={(e) => setMaxMoves(parseInt(e.target.value) || 0)}
          className='border-2 border-gray-300 px-2 py-1 rounded-xl'
        />
      </div>
      <div className="mb-2 text-lg">
  Moves: {movesCount} {maxMoves > 0 ? `/ ${maxMoves}` : ""}
</div>
      {/* gameboard */}
      <div className={`grid gap-2 mb-4 `} style={{ gridTemplateColumns: `repeat(${gridSize} , 1fr)`, width: `${gridSize * 100}px` }}>
        {
          cards?.map((card) => <div className={`aspect-square flex items-center justify-center text-xl font-bold cursor-pointer rounded-lg  text-gray-400 transition-all duration-300 ${isFlipped(card.id) ? isSolved(card.id) ? `bg-green-500 text-white` : `bg-blue-500 text-white` : `bg-gray-300 text-gray-400`}`} key={card.id} onClick={() => handleClick(card.id)}>{isFlipped(card.id) ? card.number : "?"}</div>)
        }
      </div>
      {/* Victory Message */}
      {won && !lost && (
        <div className='text-4xl font-bold text-green-500 animate-bounce mt-4'>
          You Won !
        </div>
      )}{lost && !won && (
        <div className='text-4xl font-bold text-red-500 animate-bounce mt-4'>
          You Lost !
        </div>
      )}
      {/* Reset and Play Again button */}
      <button onClick={InitializeGame} className='mt-4 px-4 py-2 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-colors duration-200'>
        {won ? "Play Again" : "Reset"}
      </button>
    </div>
  )
}

export default MemoryGame