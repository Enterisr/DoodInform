import IRow from './IRow.ts';
export class Row implements IRow {
	public Group: number;
	public Duration: number;
	public User: string;
	public Time: Date;

	constructor(group: number, duration: number, User: string, time: Date) {
		this.Group = group;
		this.Duration = duration;
		this.User = User;
		this.Time = time;
	}

	public toStr() {
		return JSON.stringify(this);
	}
}
