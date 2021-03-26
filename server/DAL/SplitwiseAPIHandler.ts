import { Router } from 'https://deno.land/x/opine@1.2.0/mod.ts';
import { getCookies } from 'https://deno.land/std@0.83.0/http/cookie.ts';
import DataWriter from '../DAL/DataWriter.ts';
import DataReader from '../DAL/DataReader.ts';
import { Row } from '../Models/Row.ts';

let dr = new DataReader();
let dw = new DataWriter();
await dr.connect();
await dw.connect();
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
			let { groups } = await this.getGroups();
			res.send(groups);
		});
		this.SplitRouter.use('/groups/:ID', async (req: any, res: any, next: Function) => {
			//validate
			const group = req.params.ID;
			const isMember: Boolean = await this.validateGroup(group);
			if (isMember) {
				this.setGroup(group);
				next();
			} else res.setStatus(403).send("You don't have access to this group :(");
		});
		this.SplitRouter.get('/groups/:ID', this.getLastTurnOn.bind(this));
		this.SplitRouter.post('/groups/:ID', this.PostLastTurnOn.bind(this));
	}

	setToken(token: string) {
		this.Token = token;
	}
	setGroup(groupId: string) {
		this.Group = parseInt(groupId);
	}
	async validateGroup(groupId: number) {
		let { groups } = await this.getGroups();
		console.log(groups);
		let selectedGroupIDX = groups.findIndex((group: any) => group.id == groupId);
		return selectedGroupIDX !== -1;
	}
	async getLastTurnOn(req: any, res: any) {
		try {
			let [ row ] = await dr.ReadLastRecordForGroup(this.Group);
			if (row) {
				let rowObj = new Row(this.Group, row.Duration, '0', row.Time);
				let rowStringfy = rowObj.toStr();
				console.log(rowStringfy);

				res.send(rowObj);
			} else {
				res.send(404);
			}
		} catch (ex) {
			console.error('getLastTurnOn:' + ex.toString());
		}
	}
	async PostLastTurnOn(req: any, res: any, next: Function) {
		try {
			let duration: number = req.parsedBody.duration;
			let row = new Row(this.Group, duration, req.path, new Date());
			dw.AppendNewRow(row);
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
