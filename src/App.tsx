import { useEffect, useState } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti';
import Seconds from './components/Seconds';

export interface DieData {
  value: number;
  isHeld: boolean;
  id: string;
}


function App() {
  const [dice, setDices] = useState(() => {
    return allNewDice();
  });
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(1);

  useEffect(() => {
    let won: boolean = dice.every((die) => die.isHeld && die.value == dice[0].value);
    if (won) {
      setTenzies(true);
      console.log("You WON !");
    };
  }, [dice]);

  function allNewDice(): DieData[] {
    let result: DieData[] = [];
    for (let i = 0; i < 10; i++) {
      result.push({ value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() });
    }
    return result;
  }

  function throwDices() {
    const newDiceValues = allNewDice();

    if (tenzies) {
      setRolls(1);
      setTenzies(false);
      setDices(() => allNewDice());
      return;
    }

    setRolls((old) => ++old);
    setDices((oldDice) => {
      return oldDice.map((old, idx) => {
        return { ...old, value: old.isHeld ? old.value : newDiceValues[idx].value }
      })
    })
  }

  function holdDie(id: string): void {
    if (tenzies) {
      return;
    }
    setDices((oldDice) => oldDice.map((oldDie) => {
      return oldDie.id == id ? { ...oldDie, isHeld: !oldDie.isHeld } : { ...oldDie }
    }))
  }

  let diceElements = dice.map((die, idx) => {
    return <Die key={idx} data={die} onClick={() => holdDie(die.id)} />
  })


  return (

    <main className='tile'>
      {tenzies && <Confetti style={{ width: "100%", height: "100%" }} />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice--grid'>
        {diceElements}
      </div>
      <div>Rolls: {rolls}</div>
      {/* <Seconds  key={} /> */}
      <button className='roll--dice' onClick={throwDices} >{tenzies ? "New game" : "Roll"}</button>
    </main>
  )
}

export default App
