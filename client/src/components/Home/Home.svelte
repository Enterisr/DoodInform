<script>
    import dayjs from 'dayjs';
    import Weather from './Weather.svelte';
    import Utils from '../../Utils.js';
    import { toast } from '@zerodevx/svelte-toast'


        let duration = 0; 
        let lastTurnOn = "00:00";
        $:inEditing = false;

        function calcDate(lastTurn){

            let lastTurnOnDate = dayjs(lastTurn);
            let now = dayjs();
            if(now.diff(lastTurnOnDate,"day")==0){
                return lastTurnOnDate.format("HH:mm");
            }
                return "not today :(";
        }
        async function FetchLastTurnon(){
            
            let uri =Utils.ResolveServerPath()+"Authed/"+window.location.pathname;
            let line  = await fetch(uri,{
                        method: 'GET', 
                        mode: 'cors',
                        //body: JSON.stringify({duration}),
                        headers: {
                        'Content-Type': 'application/json'
                        }});
            let resJsoned =await line.json();
            lastTurnOn = calcDate(resJsoned.Time);
            duration = resJsoned.Duration;
        
        }
        
        
        function PressedON(){
            inEditing = true;
        }
        async function OnSubmit(e){
            e.preventDefault();
            let uri = Utils.ResolveServerPath()+"Authed/"+window.location.pathname;
            const ans = await fetch(uri,{
                    method: 'POST', 
                    mode: 'cors',
                    body: JSON.stringify({duration}),
                    headers: {
                    'Content-Type': 'application/json'
                    }});
            ans = await ans.text();
            if(ans==="ok"){ 
                isEditing = false;
                lastTurnOn = dayjs();
            }
            else toast.push('the submission failed :(')
    
        }
        FetchLastTurnon();
    </script>


        <Weather/>
        
        <article class="button-wrap">
        {#if inEditing}
            <form >
                <label for="timeRannge" class="simpleLabel timeSelector-label">
                    for <time classname="timeSelctorDuration">{duration}</time> minutes </label>
            <input bind:value={duration} name="timeRannge" class="timeSelctor-range"  type="range" min="10" max="200"/>
            <button on:click={OnSubmit} class="submitReport-button" type="submit">ok</button>
           
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
            <p class="explain-p">Just press the button and choose the duration the water will be boiling for</p>
            <button class="isPressed-button" on:click={PressedON}>Turn on</button>	
        
            {/if}
                </article>

    
    <style>

        .explain-p{
            width: 100%;
            position: relative;
            text-align: center;
            margin:1em auto;
            color:rgb(20, 20, 20);
            font-style: italic;
        }
        article{
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            position: relative;
            height: 65%;
            background: #ffffff52;
            width: 100%;
            border-radius: 16px;
            max-width: 28em;
        }
        .button-wrap{
            margin: 3em auto;
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

        @media (max-width: 640px) {
      
        .isPressed-button{
            font-size: 2em;
            cursor: pointer;
            margin: 0 auto;
            color: var(--mainColor);
            transition: ease all .3s;
            }
       
        }
    </style>