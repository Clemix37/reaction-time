import { useState } from 'react';
import './App.css';

function App() {
	const [isLaunched, updateIsLaunched] = useState(false);
	const [isDisplayed, updateIsDisplayed] = useState(false);
	const [gotResults, updateGotResults] = useState(false);
	const [dateMs, updateDateMs] = useState(null);
	const [reactionTime, updateReactionTime] = useState(0);

	const checkTime = (e) => {
		if(!isLaunched) {
			launch();
			return; 
		}
		if(!isDisplayed) {
			updateIsLaunched(false);
			emptyResults();
			return;
		}
		const avant = dateMs.getTime();
		const apres = (new Date()).getTime();
		updateReactionTime(apres-avant);
		updateGotResults(true);
		updateIsDisplayed(false);
		updateDateMs(null);
	};

	const emptyResults = () => {
		updateIsDisplayed(false);
		updateGotResults(false);
		updateDateMs(null);
		updateReactionTime(0);
	};

	const launch = () => {
		emptyResults();
		updateIsLaunched(true);
		const time = parseInt(2 + (Math.random() * 8));
		setTimeout(() => {
			updateDateMs(new Date());
			updateIsDisplayed(true);
		}, time*1000);
	};

  document.addEventListener('keypress',checkTime);

  return (
    <div className="colonne">
		<div className="ligne">
			<div className="colonne content-centered">Reaction Time !</div>
		</div>
		{
			!isLaunched ? (
				<div className="ligne">
					<div className='colonne content-centered'>
						<button className="btn btn-play" onClick={launch}>PLAY</button>
					</div>
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
