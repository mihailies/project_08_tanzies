import { useEffect, useState } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti';
import Timer, { TimerAction } from './components/Timer';

export interface DieData {
  value: number;
  isHeld: boolean;
  id: string;
}

export interface GameResultData {
  moment: string;
  rolls: number;
  duration: number;
}

const TENZIES_LOCAL_STORAGE_ITEM_NAME = "tenziesResults";

function App() {
  const [dice, setDices] = useState(() => {
    return allNewDice();
  });
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(1);
  const [timerAction, setTimerAction] = useState(TimerAction.stop);
  const [gamesResult, setGamesResult] = useState(() => {
    let results = JSON.parse(localStorage.getItem(TENZIES_LOCAL_STORAGE_ITEM_NAME) || "[]");
    return results ? results : [];
  })
  const [gameTime, setGameTime] = useState(0);




  useEffect(() => {
    let won: boolean = dice.every((die) => die.isHeld && die.value == dice[0].value);
    if (won) {
      setTenzies(true);
      if (timerAction != TimerAction.stop) {
        let gameResultData: GameResultData = {
          duration: gameTime,
          moment: new Date().toLocaleString('en-US', { hour12: false, hour: "numeric", minute: "numeric", year: "numeric", month: "numeric", day: "numeric" }),
          rolls: rolls
        }
        setGamesResult((oldGames: GameResultData[]) => {
          let results: GameResultData[] = [...oldGames]
          results.unshift(gameResultData);
          localStorage.setItem(TENZIES_LOCAL_STORAGE_ITEM_NAME, JSON.stringify(results));
          return results;
        });
      }
      setTimerAction(TimerAction.stop);
    }
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

    // new game
    if (tenzies) {
      setRolls(1);
      setTenzies(false);
      setDices(() => allNewDice());
      setTimerAction(TimerAction.reset)
      return;
    }

    setTimerAction(TimerAction.start);
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
    setTimerAction(TimerAction.start);
    setDices((oldDice) => oldDice.map((oldDie) => {
      return oldDie.id == id ? { ...oldDie, isHeld: !oldDie.isHeld } : { ...oldDie }
    }))
  }

  let diceElements = dice.map((die, idx) => {
    return <Die key={idx} data={die} onClick={() => holdDie(die.id)} />
  })

  const resultsElements = gamesResult.map((result: GameResultData) => {
    return <div key={nanoid()}>{result.moment + " -- Rolls: " + result.rolls + " -- Time: " + result.duration} </div>
  })

  return (
    <>
      <main className='tile'>
        {tenzies && <Confetti style={{ width: "100%", height: "100%" }} />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice--grid'>
          {diceElements}
        </div>
        <div style={{ display: 'grid', gridTemplate: "auto / auto auto", padding: "0 50px", width: "100%" }}>
          <div style={{ placeSelf: "start" }}>Rolls: {rolls}</div>
          <div style={{ placeSelf: "end" }}>
            <Timer action={timerAction} updateAppStateGameTime={(t) => {
              setGameTime(t)
            }} />
          </div>
        </div>

        {/* <div style={{ display: "flex" }}>
        <button onClick={() => setTimerAction(TAction.start)} >Start</button>
        <button onClick={() => setTimerAction(TAction.reset)} >Reset</button>
        <button onClick={() => setTimerAction(TAction.stop)} >Stop</button>
        <button onClick={() => setTimerAction(TAction.restart)} >Restart</button>
      </div> */}
        <button className='roll--dice' onClick={throwDices} >{tenzies ? "New game" : "Roll"}</button>
      </main>
      <div style={{ color: '#fff', marginTop: "30px" }}>
        {resultsElements}
      </div>
    </>
  )
}

export default App
