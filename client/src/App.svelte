<script>
		import { fade } from 'svelte/transition';
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
		lastTurnOn =JSON.stringify(line);
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
		let resCom = await res.text();

	}
	FetchLastTurnon();
</script>

<main>
	<h1>DoodDetctor</h1>

			<article class="button-wrap">
		{#if isPressed}
		<form >
		<label class="simpleLabel timeSelector-label">
			for <time>{duration}</time> minutes
		<input bind:value={duration} class="timeSelctor-range"  type="range" min="10" max="120"/>
		<button on:click={OnSubmit} class="submitReport-button" type="submit">ok</button>
	</label>
	</form>
		{:else}
		<div class="currentTurnon-div">
			<span class="simpleLabel">last turn on time:</span>
			<time>{lastTurnOn}</time>

		</div>
		<p class="explain-p">Just press the button and choose the duration that youv'e chosen</p>
		<button class="isPressed-button" on:click={PressedON}>Turn on</button>	
	
		{/if}
			</article>


</main>

<style>
@import url('https://fonts.googleapis.com/css2?family=Langar&display=swap');
	main {
	    text-align: center;
    padding: 1em;
    margin: 0 auto;
    height: 100vh;
	position: relative;
    width: 100vw;
    background: linear-gradient(black,rgb(43, 43, 43));
	}
	.explain-p{
		width: 25em;
		position: relative;
		text-align: center;
		margin:1em auto;
		color:rgb(141, 141, 141);
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
		background-color: #41a846;
		color: white;
		transition: ease all .3s;
		border:none;

	}
	.isPressed-button{
    font-size: 2.6em;
    border-radius: 50%;
    cursor: pointer;
    height: 5em;
    width: 5em;
    text-align: center;
    margin:0 auto;

	}
	button:hover{
		box-shadow: 0px 0px 2px 7px green, 0px 0px 51px 82px #67ff67 inset;
	
	}
	button:active{
		background-color: rgb(63, 253, 63);
		box-shadow: 0px 0px 2px 5px green;
	}

	.simpleLabel{
		color:white;
	}
	.currentTurnon-div span{
		font-size: 1.5em;
	}
	.timeSelector-label,.currentTurnon-div time{
		font-size: 3em;
		font-weight: 100;
		color:white;

		animation: neon .08s ease-in-out infinite alternate;

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
		box-shadow: 0px 0px 2px 3px green;

	}
	h1 {
	    color: #da260f;
    font-family: 'Langar', cursive;
	justify-self: start;
    text-transform: uppercase;
	font-size:calc(5rem + 1vw);
	margin-top: 1em;
    font-weight: 100;
	}
	@keyframes neon {
  from {
    text-shadow:
    0 0 6px rgba(202,228,225,0.92),
    0 0 30px rgba(202,228,225,0.34),
    0 0 12px rgba(30,132,242,0.52),
    0 0 21px rgba(30,132,242,0.92),
    0 0 34px rgba(30,132,242,0.78),
    0 0 54px rgba(30,132,242,0.92);
  }
  to {
    text-shadow:
    0 0 6px rgba(202,228,225,0.98),
    0 0 30px rgba(202,228,225,0.42),
    0 0 12px rgba(30,132,242,0.58),
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
    font-size: 2.6em;
    border-radius: 50%;
    cursor: pointer;
    height: 3em;
    width: 3em;
    margin: 0 auto;
    color: white;
    transition: ease all .3s;
		}
	}
</style>