import DataAccessor from "./DataAccessor.ts";
import {Row} from '../Models/Row.ts';
class DataReader extends DataAccessor{
    //over enginereed to see how inheritance works in ts 
    StartIn?:number = -1;
    constructor(fileName?:string,startIn?:number) {   
            super(fileName);   
            this.StartIn = startIn; 
      }   
    async ReadLastRecord(){
        //read the latest time the dood was on.
        let txt:string = await Deno.readTextFile(this.FileName);
        let rows:Array<Row> = JSON.parse(txt);
        let eof:number = rows.length-1;
        return rows[eof];
    }
}
export default DataReader;