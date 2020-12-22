import { opine, serveStatic } from "https://deno.land/x/opine@0.21.2/mod.ts";
const app = opine();
const CLIENT_PATH:string = "../client/public";
app.get("/", function (req, res) {
  res.sendFile(`${CLIENT_PATH}/index.html`);
});
app.use(serveStatic(CLIENT_PATH));

app.listen(3000);
console.log("Opine started on port 3000");