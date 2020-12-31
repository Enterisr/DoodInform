<script>
    import Utils from './Utils.js'

	let temprature = 0;
	let weatherIMG = "";
	async function GetWeather(){
		let URI = Utils.ResolveServerPath()+"weatherReport";
		let res = await fetch(URI,{
					method: 'GET', 
					mode: 'cors',headers: {'Content-Type': 'application/json'}});
		let weather = await res.json();
		temprature =weather.current.temperature;
		weatherIMG = weather.current.weather_icons;
    }
    GetWeather();

</script>
<section class="tempratureWrap">
	<span class="weather-span">{temprature}°C</span>
	<img src={weatherIMG} alt="weather"/>
</section>    
<style>
.tempratureWrap{
    width: 9em;
    background-color: rgba(187, 187, 187, 0.13);
    border-radius: 30px;
    position: relative;
    height: 3em;
    margin: auto;
    text-align: center;
}
.tempratureWrap img{
    border-radius: 30px;
    height: 3em;
    right: 0;
}
.weather-span{
    font-size: 1em;
    font-weight: 600;
    position: relative;
    left: 0;
    color: white;
    font-family: monospace;
    display: inline-block;
    height: 100%;
    margin-right: 1em;
    vertical-align: middle;
}
</style>