import {
  json,
  opine,
  serveStatic,
} from "https://deno.land/x/opine@0.21.2/mod.ts";
import DataWriter from "DAL/DataWriter.ts";
import DataReader from "DAL/DataReader.ts";

import { Row } from "./Models/Row.ts";
const app = opine();
const CLIENT_PATH: string = "../client/public";
app.use(serveStatic(CLIENT_PATH));
app.use(json());
app.post(
  "/submitTurnon",
  async function (req: any, res: any, next: Function) {
    try {
      let duration: number = req.parsedBody?.duration;
      let row: Row = new Row(duration, req.ip, new Date());
      let dw: DataWriter = new DataWriter();
      dw.AppendNewLine(row.toString());
      res.send("ok");
      
    }
    catch(ex){
      console.error(ex.toString());
    }
  }
);
app.get(
  "/getLastTurnOn",
  async function (req: any, res: any, next: Function) {
    try {
      let dr: DataReader = new DataReader();
      let row: Row = new Row(duration, req.ip, new Date());
      dr.ReadLastRecord();
      res.send("ok");
      
    }
    catch(ex){
      console.error(ex.toString());
    }
  }
);
app.get("/", function (req:any, res:any) {
  res.sendFile(`${CLIENT_PATH}/index.html`);
});

app.listen(3000);
