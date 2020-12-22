<script>
		import { fade } from 'svelte/transition';
		import {Utils} from 'Utils.js'
	let isPressed = false;
	let time = 0; 
	function PressedON(){
		//alert(this);
		isPressed = true;
	}
	async function OnSubmit(){
		let uri = Utils.ResolveServerPath()+"submitTurnon";
		let res  = await fetch(uri,{
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				mode: 'cors', // no-cors, *cors, same-origin
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin', // include, *same-origin, omit
				body: JSON.stringify({time}),
				headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
				}});
		let resCom =res.text();
	}

</script>

<main>
	<h1>DoodDetctor</h1>

			<article class="button-wrap">
		{#if isPressed}
		<form>
		<label class="simpleLabel timeSelector-label">
			for <time>{time}</time> minutes
		<input bind:value={time} class="timeSelctor-range" transition:fade type="range" min="10" max="120"/>
		<button on:click={OnSubmit} class="submitReport-button" type="submit">ok</button>
	</label>
	</form>
		{:else}
		<button class="isPressed-button" on:click={PressedON}>Turn on</button>	
		<div transition:fade class="currentTurnon-div">
			<span class="simpleLabel">last turn on time:</span>
			<time>16:32</time>

		</div>
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
    width: 100vw;
    background-color: rgb(23 23 23);
	}
	article{
		display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    position: relative;
	}
	.button-wrap{
		position: relative;

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
    margin: 2em auto;

	}
	button:hover{
		box-shadow: 0px 0px 2px 2px green;
	}
	button:active{
		background-color: rgb(63, 253, 63);
		box-shadow: 0px 0px 2px 5px green;
	}
	.currentTurnon-div{
		color:white;
	}
	.simpleLabel{
		color:white;
	}

	.timeSelector-label,.currentTurnon-div time{
		font-size: 1.5em;
		font-weight: 100;
		animation: neon .08s ease-in-out infinite alternate;

	}
	.timeSelctor-range{
		max-width: 16em;
		text-align: center;
		display: block;
		width: 50%;
		margin-top:1em ;
		margin: auto;
	}
	.submitReport-button{
		margin-top: 1em;
		cursor: pointer;
		padding: .3em .6em;
		border-radius: 4px;
	}
	h1 {
	    color: #da260f;
    font-family: 'Langar', cursive;
	justify-self: start;
    text-transform: uppercase;
    font-size: 3em;
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
    margin: 2em auto;
    color: white;
    transition: ease all .3s;
		}
	}
</style>