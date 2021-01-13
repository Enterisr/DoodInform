import { OAuth2Client } from 'https://deno.land/x/oauth2_client/mod.ts';
import 'https://deno.land/x/dotenv/load.ts';
import { opine } from 'https://deno.land/x/opine@0.21.2/mod.ts';
import { to } from 'https://deno.land/x/evt@v1.8.7/lib/util/genericOperators/to.ts';

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
			redirectUri: `http://localhost:${this.port}/backfromauth/`,
			defaults: {
				scope: 'read:user'
			}
		});
	}

	GetAuthURI(req: any, res: any) {
		res.send(this.oauth2Client.code.getAuthorizationUri().href);
	}
	async ReturnFromCallback(req: any, res: any, next: any) {
		let body = [
			`code=${req.query.code}`,
			'grant_type=authorization_code',
			`client_id=${this.id}`,
			`client_secret=${this.secret}`,
			'redirect_uri=http://localhost:3000/backfromauth/'
		];
		let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
		let fetchRes = await fetch(`https://secure.splitwise.com/oauth/token`, {
			headers,
			body: body.join('&'),
			mode: 'cors',
			method: 'POST'
		});
		let token = await fetchRes.json();
		token = token.access_token;
		res.locals.token = token;
		res.cookie({
			name: 'split_token',
			value: token,
			httpOnly: false,
			secure: false, //TODO: change in prod
			maxAge: 16400
		});
		next();
		//	res.redirect('http://localhost:5000');
	}
}
