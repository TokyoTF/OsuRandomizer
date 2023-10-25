import { Auth, Client } from "osu-web.js";
import "dotenv/config";
import process from "node:process";

const auth = new Auth(
  process.env.osu_clientid,
  process.env.osu_clientsecret,
  process.env.osu_redirectUri
);
const Keys = await auth.clientCredentialsGrant();
const api = new Client(Keys.access_token);

export default class OsuRequest {
  Api() {
    return api;
  }
}
