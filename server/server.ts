import { json, opine, serveStatic } from 'https://deno.land/x/opine@0.21.2/mod.ts';
import { opineCors } from 'https://deno.land/x/cors@v1.2.1/mod.ts';
import DataWriter from './DAL/DataWriter.ts';
import DataReader from './DAL/DataReader.ts';
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Row } from './Models/Row.ts';
const app = opine();
const CLIENT_PATH = '../client/public';
const CONFIG  = config();
app.use(serveStatic(CLIENT_PATH));
app.use(json());
app.use(opineCors()); // Enable CORS for All Routes

app.post('/submitTurnon', async function(req: any, res: any, next: Function) {
	try {
		let duration: number = req.parsedBody.duration;
		let row = new Row(duration, req.ip, new Date());
		let dw = new DataWriter();
		dw.AppendNewLine(row);
		res.send('ok');
	} catch (ex) {
		console.error(ex.toString());
	}
});
app.get('/getLastTurnOn', async function(req: any, res: any, next: Function) {
	try {
		let dr = new DataReader();
		let row = await dr.ReadLastRecord();
		console.log(typeof row);
		if(row){
		let rowObj = new Row(row.Duration,"0",row.Time);
		let rowStringfy =rowObj.toStr(); 
		res.send(rowStringfy);
			
	}
		else{
			res.send("db not found");
		}
	} catch (ex) {
		console.error(ex.toString());
	}
});
app.get("/weatherReport",async function(req,res){
	let userIP = req.conn.remoteAddr;
	const geolocationRes = await fetch(`http://api.ipstack.com/${userIP}?access_key=${CONFIG.IPTRACE_SECRET}&format=1`);
	let geolocation = await geolocationRes.json();
	geolocation.city=geolocation.city?geolocation.city:"Tel Aviv";//just for testing...
	if (geolocation.city){
		let userCity = encodeURIComponent(geolocation.city);
		let weatheResponse =  await fetch(`http://api.weatherstack.com/current?access_key=${CONFIG.WEATHER_SECRET}&query=${userCity}`);
		let weather =await weatheResponse.json();
		res.send(weather);
	}
	else{
		res.sendStatus(404);
	}
});
app.get('/', function(req: any, res: any) {
	res.sendFile(`${CLIENT_PATH}/index.html`);
});


app.listen(3000);
