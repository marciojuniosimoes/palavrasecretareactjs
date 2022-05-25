import './telainicial.css'

import React from 'react'

function telainicial({startGame}) {
  return (
    <div className='telainicio'>

    <h1> Secret Word</h1>
    <p>Começe a jogar!!</p>
    <button onClick={startGame}>Começar o Jogo</button>
    </div>
  )
}

export default telainicial