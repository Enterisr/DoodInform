<script>
import dayjs from 'dayjs';
import Weather from './Weather.svelte';
import Utils from './Utils.js'
	let isPressed = false;
	let duration = 0; 
	let lastTurnOn = "00:00";

	async function FetchLastTurnon(){
		
		let uri = Utils.ResolveServerPath()+"getLastTurnOn";
		let line  = await fetch(uri,{
					method: 'GET', 
					mode: 'cors',
					//body: JSON.stringify({duration}),
					headers: {
					'Content-Type': 'application/json'
					}});
		let resJsoned =await line.json();
		console.table(resJsoned);
		let lastTurnOnDate = dayjs(resJsoned.Time);
		let now = dayjs();
		if(now.diff(lastTurnOnDate,"day")==0){
			lastTurnOn = lastTurnOnDate.format("HH:mm");
			duration = resJsoned.Duration;
		}
		else{
			lastTurnOn = "not today :(";
		}
	}
	
	
	function PressedON(){
		//alert(this);
		isPressed = true;
	}
	async function OnSubmit(e){
		let uri = Utils.ResolveServerPath()+"submitTurnon";
		let res  = await fetch(uri,{
				method: 'POST', 
				mode: 'cors',
				body: JSON.stringify({duration}),
				headers: {
				'Content-Type': 'application/json'
				}});
		let resJsoned = await res.json();

	}
	FetchLastTurnon();
</script>

<main>
	<h1>doodetector</h1>
	<Weather/>
	
	<article class="button-wrap">
	{#if isPressed}
		<form >
		<label class="simpleLabel timeSelector-label">
			for <time classname="timeSelctorDuration">{duration}</time> minutes
		<input bind:value={duration} class="timeSelctor-range"  type="range" min="10" max="120"/>
		<button on:click={OnSubmit} class="submitReport-button" type="submit">ok</button>
		</label>
		</form>
	{:else}
		<div class="currentTurnon-div">
			<div>
			<span class="simpleLabel">last turn on time:</span>	
			<time>{lastTurnOn}</time>			
		</div>
			{#if duration}
				<div>
					<span class="simpleLabel">
					for <time> {duration} </time> minutes </span>
			
				</div>
			{/if}

		</div>
		<p class="explain-p">Just press the button and choose the duration that youv'e chosen</p>
		<button class="isPressed-button" on:click={PressedON}>Turn on</button>	
	
		{/if}
			</article>


</main>

<style>
@import url('https://fonts.googleapis.com/css2?family=Langar&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Sacramento&display=swap');	:root{
		--mainColor:rgb(22, 0, 96);
		--submitColor:white;
		
	}
	main {
	    text-align: center;
    padding: 1em;
    margin: 0 auto;
    height: 100vh;
	position: relative;
    width: 100vw;
    background: linear-gradient(rgb(0 72 151),rgb(95 172 255 / 88%));
	}
	.explain-p{
		width: 25em;
		position: relative;
		text-align: center;
		margin:1em auto;
		color:rgb(20, 20, 20);
	}
	article{
		display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    position: relative;
	height:65%;
	}
	.button-wrap{

		margin: auto;
		text-align: center;
	}
	button{
		background-color:var(--submitColor);
		color:var(--mainColor);
		transition: ease all .3s;
		border:none;

	}
	.isPressed-button{
    font-size: 2em;
	border-radius: 3px;
    cursor: pointer;
    text-align: center;
    margin:0 auto;

	}
	button:hover{
		box-shadow: 0px 0px 3px 3px var(--submitColor);

	}
	button:active{
		background-color: rgb(91, 105, 228);
		box-shadow: 0px 0px 3px 3px var(--submitColor);
	}

	.simpleLabel{
		color:white;
	}
	.currentTurnon-div span{
		font-size: 1.5em;
	}
	 time{
		font-size: 3em;
		font-weight: 400;
		border-bottom: 2px solid var(--mainColor);
		color:var(--mainColor);
	}
	
	.timeSelctor-range{
		max-width: 16em;
		text-align: center;
		display: block;
		width: 100%;
		cursor: pointer;
		margin-top:1em ;
		margin: auto;
	}
	.submitReport-button{
		margin-top: 1em;
		cursor: pointer;
		font-size: 1.5rem;
		padding: .5em 1em;
		border-radius: 4px;
	}
	.submitReport-button:hover{
		margin-top: 1em;
		cursor: pointer;
		font-size: 1.5rem;
		padding: .5em 1em;
		border-radius: 4px;	
		box-shadow: 0px 0px 2px 3px var(--mainColor);

	}
	h1 {
		color: var(--mainColor);
		font-family: 'Sacramento', cursive;
		justify-self: start;
		text-transform: uppercase;
		font-size: calc(5rem + 1vw);
		text-transform: lowercase;
		margin-top: 25px;
		font-weight: 100;
	}
	@keyframes neon {
  from {
    text-shadow:

    0 0 21px rgba(30,132,242,0.92),
    0 0 34px rgba(30,132,242,0.78),
    0 0 54px rgba(30,132,242,0.92);
  }
  to {
    text-shadow:
    0 0 22px rgba(30,132,242,0.84),
    0 0 38px rgba(30,132,242,0.88),
    0 0 60px rgba(30,132,242,1);
  }
}
	@media (max-width: 640px) {
		main {
			max-width: none;
		}
		.isPressed-button{
    font-size: 2em;
    cursor: pointer;

    margin: 0 auto;
    color: var(--mainColor);
    transition: ease all .3s;
		}
	}
</style>