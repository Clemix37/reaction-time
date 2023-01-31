import { useState } from 'react';
import './App.css';

function App() {
  const [isLaunched, updateIsLaunched] = useState(false);
  const [isDisplayed, updateIsDisplayed] = useState(false);
  const [gotResults, updateGotResults] = useState(false);
  const [dateMs, updateDateMs] = useState(null);
  const [reactionTime, updateReactionTime] = useState(0);

  const checkTime = () => {
    if(!isLaunched || !isDisplayed) return;
    const avant = dateMs.getTime();
    const apres = (new Date()).getTime();
    updateReactionTime(apres-avant);
    updateGotResults(true);
    updateIsDisplayed(false);
    updateDateMs(null);
  };

  const launch = () => {
    updateIsLaunched(true);
    const time = parseInt(Math.random() * 15);
    setTimeout(() => {
      updateDateMs(new Date());
      updateIsDisplayed(true);
    }, time*1000);
  };

  document.addEventListener('keyUp',checkTime);

  return (
    <div className="colonne">
      <div className="ligne">
        <div className="colonne content-centered">Reaction Time !</div>
      </div>
      {
        !isLaunched ? (
          <div className="ligne">
            <button className="btn" onClick={launch}>PLAY</button>
          </div>
        ) : (<></>)
      }
      {
        isLaunched ? (
          <div className="ligne">
            <button className={isDisplayed ? "btn btn-rounded is-green" : "btn btn-rounded is-red"} onClick={checkTime}></button>
          </div>
        ) : (<></>)
      }
      {
        gotResults ? (
          <div className="ligne">
            <span>Your reaction time is {reactionTime} ms</span>
          </div>
        ) : (<></>)
      }
      
    </div>
  );
}

export default App;
