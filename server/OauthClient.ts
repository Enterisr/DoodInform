import { OAuth2Client } from "https://deno.land/x/oauth2_client/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
const CONFIG = config();
class OauthClient{
    oauth2Client;
    constructor(key:string,secret:string){
        this.oauth2Client = new OAuth2Client({
            clientId: key,
            clientSecret: secret,//CONFIG.SPLITWISE_SECRET,
            authorizationEndpointUri: "https://secure.splitwise.com/oauth/authorize",
            tokenUri: "https://secure.splitwise.com/oauth/token	",
            redirectUri: `http://localhost:${CONFIG.PORT}/callback`,
            defaults: {
              scope: "read:user",
            },
          });
    }

  Auth(req:any,res:any){
  //  res.redirect()
  }
}