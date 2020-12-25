import DataAccessor from './DataAccessor.ts';
import { Row } from '../Models/Row.ts';
import DataReader from './DataReader.ts';

class DataWriter extends DataAccessor {
	//over enginereed to see how inheritance works in ts
	constructor(fileName?: string) {
		super(fileName);
	}
	async AppendNewLine(row: Row) {
		//read the latest time the dood was on.
		//this needs to be changed when deno will allow replacing strings instead of replacing all the contnet
		let dr: DataReader = new DataReader(this.FileName);
		let rows: any = await dr.ReadAll();
		if (!rows) {
			rows = [];
		}
		rows.push(row);
		await Deno.writeTextFile(this.FileName, JSON.stringify(rows)); //create new one if exists
	}
}
export default DataWriter;
