import { Router } from 'https://deno.land/x/opine@1.0.2/mod.ts';
import { getCookies } from 'https://deno.land/std@0.83.0/http/cookie.ts';
import DataWriter from '../DAL/DataWriter.ts';
import DataReader from '../DAL/DataReader.ts';
import { Row } from '../Models/Row.ts';

export default class SplitwiseAPIHandler {
	protected Token: string = '';
	protected Group: number;
	public SplitRouter: any;

	constructor(token: string) {
		console.log(token);
		this.Token = token;
		this.Group = -1;
		this.SplitRouter = Router();
		this.registerRoutes();
	}
	registerRoutes() {
		this.SplitRouter.use('*', (req: any, res: any, next: Function) => {
			let token = getCookies(req).split_token;
			this.setToken(token);

			next();
		});

		this.SplitRouter.get('/groups/get', async (req: any, res: any) => {
			let groups = await this.getGroups();
			console.log(groups);
			res.send(groups.groups);
		});
		this.SplitRouter.use('/groups/:ID', (req: any, res: any, next: Function) => {
			//validate
			let group = req.query.groupId;
			if (this.ValidateGroup(group)) {
				this.setGroup(group);
				next();
			}
			res.status(403).send("You don't have access to this group :(");
		});
		this.SplitRouter.get('/groups/:ID', this.getLastTurnOn);
		this.SplitRouter.post('/groups/:ID', this.PostLastTurnOn);
	}
	setToken(token: string) {
		this.Token = token;
	}
	setGroup(groupId: number) {
		this.Group = groupId;
	}
	async ValidateGroup(groupId: string) {
		let groups = await this.getGroups();
		let selectedGroupIDX = groups.findIndex((group: any) => group.id === groupId);
		return selectedGroupIDX !== -1;
	}
	async getLastTurnOn(req: any, res: any) {
		try {
			let dr = new DataReader();
			let row = await dr.ReadLastRecord();
			if (row) {
				let rowObj = new Row(this.Group, row.Duration, '0', row.Time);
				let rowStringfy = rowObj.toStr();
				res.send(rowStringfy);
			} else {
				res.send(404);
			}
		} catch (ex) {
			console.error(ex.toString());
		}
	}
	async PostLastTurnOn(req: any, res: any, next: Function) {
		try {
			let duration: number = req.parsedBody.duration;
			let row = new Row(this.Group, duration, req.path, new Date());
			let dw = new DataWriter();
			dw.AppendNewLine(row);
			res.send('ok');
		} catch (ex) {
			console.error(ex.toString());
		}
	}

	getGroups() {
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
