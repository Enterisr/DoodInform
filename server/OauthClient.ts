import { OAuth2Client } from 'https://deno.land/x/oauth2_client/mod.ts';
import 'https://deno.land/x/dotenv/load.ts';
import { opine } from 'https://deno.land/x/opine@0.21.2/mod.ts';

export default class OauthHandler {
	oauth2Client: any;
	port: string;
	secret: string;
	id: string;
	constructor() {
		this.id = Deno.env.get('SPLITWISE_ID') || '';
		this.secret = Deno.env.get('SPLITWISE_SECRET') || '';
		this.port = Deno.env.get('PORT') || '';
		this.oauth2Client = new OAuth2Client({
			clientId: this.id,
			clientSecret: this.secret,
			authorizationEndpointUri: 'https://secure.splitwise.com/oauth/authorize',
			tokenUri: 'https://secure.splitwise.com/oauth/token',
			redirectUri: `http://localhost:${this.port}/backfromauth`,
			defaults: {
				scope: 'read:user'
			}
		});
	}

	Auth(req: any, res: any) {
		res.redirect(this.oauth2Client.code.getAuthorizationUri());
	}
	async ReturnFromCallback(req: any, res: any, next: any) {
		let body = JSON.stringify({
			grant_type: 'authorization_code',
			code: req.query.code
		});
		let headers = { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' };
		let query = `${this.id}&client_secret=${this.secret}`;
		let fetchRes = await fetch(`https://secure.splitwise.com/oauth/token?client_id=${query}`, {
			headers,
			body,
			mode: 'cors',
			method: 'POST'
		});
		let ress = await fetchRes.json();
		res.send(ress);
		/* 	res.cookie({
			name: 'token',
			value: 'Bearer ' + tokens.accessToken,
			expires: new Date(Date.now() + 900000), //15 minutes
			sameSite: 'Strict'
		});
		res.redirect(`http://localhost:${this.port}/`);*/
	}
}
