<script>
import { onMount } from "svelte";
import Utils from '../../Utils.js'
    let groups = [];
    onMount(async function(){
        let uri = Utils.ResolveServerPath()+"Authed/groups/get";
        groups =await fetch(uri,{
                    method: 'GET', 
                    mode: 'cors',
                    headers: {
                    'Content-Type': 'application/json'
                    }})
                    .then((res) => res.json());
    });
    async function ChosenGroup(){

        let id = this.getAttribute('data-id');
        let uri =Utils.ResolveServerPath()+"Authed/subscribeGroup";
          groups =await fetch(uri,{
                    method: 'POST', 
                    mode: 'cors',
                    body:JSON.stringify({groupId:id}),
                    headers: {
                    'Content-Type': 'application/json'
                    }})
                    .then((res) => res.json());
        await fetch.
    }
</script>
Please select the appartment's group
<ul>
{#each groups as group}
  
    <li data-id={group.id} on:click={ChosenGroup}>
    <div class="GroupContent-div">
       <span> {group.name}</span>
       <img src={group.avatar.small} alt="group icon"/>

    </div>   
    </li>
    <hr/>
{/each}
</ul>
<style>
    ul{
        background-color: rgba(255, 255, 255, 0.199);
        width: 20em;
        display: block;
        margin: 2em auto;
        position: relative;
        padding: .5em 1em;
        text-align: center;
        list-style: none;
        border-radius: 15px;
        left: 0;
        max-height: 32em;
        overflow: auto;
    }
    hr {
    border: solid #276ebb 1px;
    }
    li{
        color:rgb(0, 0, 0);
        width:100%;
        padding: .9em;
        transition: ease .3s all;
        cursor: pointer;
        margin-bottom:1em ;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 15px;
        margin-top:1em;
        -webkit-user-select: none;
        -moz-user-select: none;
    }
    li:hover{
        background: #d4e9ff;
            }
    li:not(:first-child)::before{
        border: solid black 1px;
    }
    hr:last-child{
        display: none;
    }
    
    .GroupContent-div{ 
        display: flex;
        align-items: center;
    }

    .GroupContent-div span{ 
        flex-grow: 3;
        justify-self: center;
    }
    
    .GroupContent-div > img{
        border-radius: 30px;
        height: 2em;
        width: 2em;
        flex-grow: 0;
    }
</style>