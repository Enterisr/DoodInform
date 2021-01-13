import { Router } from 'https://deno.land/x/opine@1.0.2/mod.ts';
import { getCookies } from 'https://deno.land/std@0.83.0/http/cookie.ts';
export default class SplitwiseAPIHandler {
	protected Token: string = '';
	public SplitRouter: any;
	constructor(token: string) {
		console.log(token);
		this.Token = token;
		this.SplitRouter = Router();
		this.registerRoutes();
	}
	registerRoutes() {
		this.SplitRouter.use('*', (req: any, res: any, next: Function) => {
			let token = getCookies(req).split_token;
			this.setToken(token);
			next();
		});
		this.SplitRouter.get('/groups', async (req: any, res: any) => {
			let groups = await this.GetGroups();
			console.log(groups);
			res.send(groups.groups);
		});
	}
	setToken(token: string) {
		this.Token = token;
	}
	GetGroups() {
		let headers = {
			Authorization: `Bearer ${this.Token}`,
			'Content-Type': 'application/json',
			Host: 'www.splitwise.com'
		};
		let groups = fetch('https://www.splitwise.com/api/v3.0/get_groups', {
			headers,
			method: 'GET',
			credentials: 'include'
		}).then((res) => res.json());
		return groups;
	}
}
