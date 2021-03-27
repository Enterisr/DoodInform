<script>
 import router from 'page';
 import Home from './components/Home/Home.svelte';
 import Login from './components/Login/Login.svelte';
 import GroupSelect from './components/GroupSelect/GroupSelect.svelte'
import page from 'page';
import { SvelteToast } from '@zerodevx/svelte-toast'

 let currentPage = Login;
 let someParams = {"fun":1};
 page('/GroupSelect',function(){currentPage=GroupSelect});
 page('/groups/:ID',function(){currentPage=Home});
 page('*',function(){currentPage=Login});
 let hasToken = document.cookie.indexOf('split_token=')!==-1;
 let isInGroupPage = /\/groups\/[0-9]+$/.test(document.location.pathname);
 //only for display porpuse, the app checks token of every request with the api.
if(!hasToken){
    page.redirect('/login');
}
else if(hasToken&&!isInGroupPage){
    page.redirect('/GroupSelect');

}


 router.start();

</script>
<main>
	<div class="h1-animator">
		<h1>doodetector</h1>
	</div>
	<svelte:component this={currentPage} params="{someParams}"/>
  
</main>

<style> 
    @import url('https://fonts.googleapis.com/css2?family=Langar&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Sacramento&display=swap');	:root{
            --mainColor:rgb(22, 0, 96);
            --submitColor:white;
            
        }
        @keyframes h1-animation{
            0%{
                width: 0;
            }
    
            100%{
                width: 100%;
            }
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


      .h1-animator{
            position: relative;
            margin: auto;
            animation: ease h1-animation 2s 0.2s;
            overflow: hidden;
            height: 10em;
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
		@media (max-width: 640px) {
			main {
				max-width: none;
			}
}

</style>