<script>
import { onMount } from "svelte";
import Utils from '../../Utils.js'
    let groups = [];
    onMount(async function(){
        let uri = Utils.ResolveServerPath()+"splitAPI/groups";
        groups =await fetch(uri,{
                    method: 'GET', 
                    mode: 'cors',
                    headers: {
                    'Content-Type': 'application/json'
                    }})
                    .then((res) => res.json());
    });
</script>
Please select the appartment's group
<ul>
{#each groups as group}
  
    <li>
        {group.name}
    </li>
    <hr/>
{/each}
</ul>
<style>
    ul{
        background-color: rgba(255, 255, 255, 0.199);
        width: 20em;
        display: block;
        margin: 1em auto;
        position: relative;
        padding:.5em 1em;
        text-align: center;
        list-style: none;
        border-radius: 15px;
        left: 0;
    }
    hr {
    border: solid #276ebb 1px;
    }
    li{
        color:rgb(0, 0, 0);
        width:100%;
        padding: .9em;
        cursor: pointer;
        margin-bottom:1em ;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 15px;
        margin-top:1em;
    }
    li:not(:first-child)::before{
        border: solid black 1px;
    }
    hr:last-child{
        display: none;
    }
</style>