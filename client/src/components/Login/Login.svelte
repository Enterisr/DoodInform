
<script>
import Utils from '../../Utils.js';
import Particles from 'svelte-particles';
async function RequestLogin(){
    let reqURI = Utils.ResolveServerPath()+"getauthURI";
    const res =await fetch(reqURI,{
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json'
                    }});
    const AUTH_uri = await res.text();
    location.replace(AUTH_uri);
}
</script>


<section>
    <p>
    To know when the water will be hot, please connect to your appartment.
</p>
<button on:click={RequestLogin} class="login-button">
    <img alt="splitwise" src="assets/splitLogo.png"/>
    connect via splitwise
</button>

</section>
<Particles id="bubbles" options={{
    "particles": {
      "number": {
        "value": 50
      },
      "color": {
        "value": "#a5d3fc"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000"
        }
      },
      "opacity": {
        "value": 0.9,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 0.9744926547616141,
          "opacity_min": 0.15429467033725558,
          "sync": false
        }
      },
      "size": {
        "value": 20,
       
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "top"     
     }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "grab"
        },
        "onclick": {
          "enable": false,
          "mode": "bubble"
        },
        "resize": false
      }
    },
  }}/>

<style>
    
    p{
        color: #bed4eb;
        WIDTH: 18em;
        MARGIN: 3em AUTO;
        font-style: italic;
    }
    .login-button{
        background-color:var(--submitColor);
        color:var(--mainColor);
        transition: ease all .3s;
        border:none;
        display: flex;
        margin: auto;
        align-items: center;
        justify-content: space-between;
        text-align: center;
    }
    .login-button img{
        width: 2.5em;
        margin-right: 1em;
        border-radius: 50%;
    }
   
section {
    background: linear-gradient(#3073ba7d,#57a7ff 60%);
    width: 25em;
    height: 25em;
    padding: 2em;
    position: absolute;
    border-radius: 50px;
    top: 50%;
    border-radius: 50%;
    margin: auto;
    left: calc(50% - 12.5em);
    box-shadow: 0px 0px 24px -6px #00346c;
    text-align: center;
    transform: translateY(-50%);
}
@media only screen and (max-width: 600px) {
    section{
        width: 100vw;
        padding: 2em;
        box-shadow: none;
        background: transparent;
        text-align: center;
        border-radius: 0;
        position: absolute;
        left: 0;
        display: flex;
        margin-top: 10vh;
        flex-direction: column;
        justify-items: center;
    }
    section p{
        width: 70vw;
        margin: 10% auto;

    }
    button.login-button{
        width: 70vw;
        max-width: 20em;
        padding:.5em;
        margin: 10% auto;
        border-radius: 3em;
    }
}


</style>