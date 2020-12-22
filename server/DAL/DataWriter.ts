import DataAccessor from "./DataAccessor.ts";
import {Row} from '../Models/Row.ts';
class DataWriter extends DataAccessor {
  //over enginereed to see how inheritance works in ts
  constructor(fileName?: string) {
    super(fileName);
  }
  async AppendNewLine(line: string) {
    //read the latest time the dood was on.
    let lineToWrite = 
    await Deno.writeTextFile(
      this.FileName,
      line,
      { append: true },
    );
  }
}
export default DataWriter;
