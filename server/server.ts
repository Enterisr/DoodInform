import { json, opine, serveStatic } from 'https://deno.land/x/opine@0.21.2/mod.ts';
import { opineCors } from 'https://deno.land/x/cors@v1.2.1/mod.ts';
import { exists } from 'https://deno.land/std@0.91.0/fs/mod.ts';
import { join } from 'https://deno.land/std@0.91.0/path/mod.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';
import OauthClient from './OauthClient.ts';
import SplitwiseAPIHandler from './DAL/SplitwiseAPIHandler.ts';
const app = opine();
const CLIENT_PATH = `../client/public`;
const AUTH_CLIENT = new OauthClient();
let SplitHandler = new SplitwiseAPIHandler('');
const CONFIG = { ...config(), ...config({ path: '../.env' }), ...Deno.env.toObject() };
//app.use(sanitize()); //TODO:sanitize all input
app.use(json());
app.use(opineCors()); // Enable CORS for All Routes
app.use('/Authed', SplitHandler.SplitRouter);
app.use('/getauthURI', AUTH_CLIENT.GetAuthURI.bind(AUTH_CLIENT));
app.use('/backfromauth', AUTH_CLIENT.ReturnFromCallback.bind(AUTH_CLIENT));

app.get('/weatherReport', async function(req, res) {
	let userIP = req.conn.remoteAddr;
	const geolocationRes = await fetch(
		`http://api.ipstack.com/${userIP}?access_key=${Deno.env.get('IPTRACE_SECRET')}&format=1`
	);
	let geolocation = await geolocationRes.json();
	geolocation.city = geolocation.city ? geolocation.city : 'Tel Aviv'; //just for testing...
	if (geolocation.city) {
		let userCity = encodeURIComponent(geolocation.city);
		let weatheResponse = await fetch(
			`http://api.weatherstack.com/current?access_key=${Deno.env.get('WEATHER_SECRET')}&query=${userCity}`
		);
		let weather = await weatheResponse.json();
		res.send(weather);
	} else {
		res.sendStatus(404);
	}
});

app.get('/*', async (req, res, next) => {
	//serve static!
	const filePath = join(CLIENT_PATH, req.path);
	const isExist = await exists(filePath);
	if (isExist) return res.sendFile(filePath);
	next();
});
app.get('/*', function(req, res) {
	//SPA
	res.sendFile(`${CLIENT_PATH}/index.html`);
});

let port = parseInt(CONFIG.PORT);
console.log(`alive on port ${CONFIG.PORT}`);
app.listen(port || 3000);
