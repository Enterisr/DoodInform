import { MongoClient } from 'https://deno.land/x/mongo@v0.21.2/mod.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';
import { Row } from '../Models/Row.ts';
import IRow from '../Models/IRow.ts';

const CONFIG = { ...config(), ...config({ path: '../.env' }) };

class DataAccessor {
	//over enginereed to see how inheritance works in ts
	Collection: any;
	protected CollectionName: string;
	protected DBName: string;
	constructor(collectionName: string = 'Turnon', dbName: string = 'Doodetector') {
		this.CollectionName = collectionName;
		this.DBName = dbName;
	}

	async connect() {
		const client = new MongoClient();
		await client.connect({
			db: 'admatay',
			tls: true,
			servers: [
				{
					host: 'cluster0-shard-00-01.wypab.mongodb.net',
					port: 27017
				}
			],
			credential: {
				username: 'atlas_admin',
				password: CONFIG.MONGO_PASS,
				db: 'admatay',
				mechanism: 'SCRAM-SHA-1'
			}
		});
		const db = client.database(this.DBName);
		this.Collection = db.collection<IRow>(this.CollectionName);
	}
}

export default DataAccessor;
