import DataAccessor from './DataAccessor.ts';
import { Row } from '../Models/Row.ts';
import { existsSync } from 'https://deno.land/std/fs/mod.ts';

class DataReader extends DataAccessor {
	//over enginereed to see how inheritance works in ts
	constructor(collectionName: string = 'Turnon', dbName: string = 'Doodetector') {
		super(collectionName, dbName);
	}
	async ReadLastRecordForGroup(groupId: number) {
		//read the latest time the dood was on.
		if (this.Collection) {
			const d: any = await this.Collection
				.find({ Group: groupId }, { noCursorTimeout: false })
				.sort({ time: -1 })
				.limit(1)
				.toArray();
			console.log(d);
			return d;
		}
	}
}
export default DataReader;
