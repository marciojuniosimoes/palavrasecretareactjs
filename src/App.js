import Telainicial from './components/telainicial';
import GameOver from './components/GameOver';
import Game from './components/Game';

//react
import { useCallback,useEffect, useState } from 'react';
import './App.css';
//data
import wordsList from './data/word'

const stages=[
  {id:1, name:'start'},
  {id:2,name:'game'},
  {id:3, name:'end'}
]

function App() {

  const [gameStage,setGameStage]=useState(stages[0].name)
  const [word]=useState(wordsList)
  const [pickedWord, setPikedWord]=useState('')
  const [category, setCategory]= useState('')
  const [letters, setLetters]=useState([])
  //estados das letras
  const [guessedLetters, setGuessedLetters]= useState([])
  const [wrongLetters, setWrongLetters]= useState([])
  const [ guesses, setGuesses]= useState(3)
  const [score, setScore]= useState(0)
  
  // funcão que ira fazer o objeto do array

  const categoryAndPicked=()=>{
    const categories= Object.keys(word);
    //uso do math random e floor para trazer keys inteiras
    const category = categories[Math.floor( Math.random()* Object.keys(categories).length)]
    //buscada de uma palavra aleatória no array

    const words = 
    word[category][Math.floor(Math.random()* word[category].length)]


    return {words, category}

  }
  
  const startGame= ()=>{
    const {words, category} =categoryAndPicked()

    let wordLetters = words.split('')
    wordLetters = wordLetters.map((a)=>a.toUpperCase())
    console.log(wordLetters)

    setGameStage(stages[1].name)
    setPikedWord(words)
    setCategory(category)
    setLetters(wordLetters)
  }
  const verifyLetter=(letter)=>{
    //o que o usuário digita transforma em maiúsculo
    const normalizedLetter = letter.toUpperCase()
    //checar se o usuário já utilizou a letra
    if(
      guessedLetters.includes(normalizedLetter)|| wrongLetters.includes(normalizedLetter)
     
    ){
      return;
    }
    //
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters)=>[
        ...actualGuessedLetters,
        normalizedLetter
      ]);
    } else{
      setWrongLetters((actualWrongLetters)=>[
        ...actualWrongLetters,
        normalizedLetter

      ])
    }
    console.log(guessedLetters)
  
  }

  const retry =()=>{
    setGameStage(stages[0].name)
  }



  return (
    <div className="App">
      {gameStage==='start'&& <Telainicial startGame ={startGame}/>}
      {gameStage==='game'&& <Game 
      verifyLetter={verifyLetter}
       pickedWord={pickedWord}
        category={category} 
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
         />}
      {gameStage==='end'&& <GameOver retry={retry}/>}


      
    </div>
  );
}

export default App;
