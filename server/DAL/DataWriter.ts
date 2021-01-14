import DataAccessor from './DataAccessor.ts';
import { Row } from '../Models/Row.ts';
import DataReader from './DataReader.ts';

class DataWriter extends DataAccessor {
	//over enginereed to see how inheritance works in ts
	constructor(collectionName: string = 'Turnon', dbName: string = 'Doodetector') {
		super(collectionName, dbName);
	}
	async AppendNewRow(row: Row) {
		this.Collection.insertOne(row);
		return row;
	}
}
export default DataWriter;
