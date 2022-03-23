import * as dotenv from "dotenv";
dotenv.config();
import * as App from "../index";

console.log("App imported");

exports.mochaHooks = {
    async afterEach()
    {
    }
};