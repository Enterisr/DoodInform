import DataAccessor from './DataAccessor.ts';
import { Row } from '../Models/Row.ts';
import { existsSync } from 'https://deno.land/std/fs/mod.ts';

class DataReader extends DataAccessor {
	//over enginereed to see how inheritance works in ts
	StartIn?: number = -1;
	constructor(fileName?: string, startIn?: number) {
		super(fileName);
		this.StartIn = startIn;
	}
	async ReadLastRecord() {
		if (existsSync(this.FileName)) {
			//read the latest time the dood was on.
			let txt: string = await Deno.readTextFile(this.FileName);
			let rows: Array<Row> = JSON.parse(txt);
			let eof: number = rows.length - 1;
			return rows[eof];
		}
	}
	async ReadAll() {
		if (existsSync(this.FileName)) {
			let txt: string = await Deno.readTextFile(this.FileName);
			let rows: Array<Row> = JSON.parse(txt);
			return rows;
		}
	}
}
export default DataReader;
