import * as dotenv from "dotenv";
dotenv.config();

import TelegramBot = require("node-telegram-bot-api");
import { Career } from "./careercentre/career";
import { Config } from "./config";
import { Sleep } from "./util/Sleep";

class App
{
    public constructor()
    {

        Career.Init();
        setInterval(this.Intervals, 15 * 60 * 1000);
    }

    public async Intervals()
    {
        const listeners = [
            () => {}
        ];

        for (const listener of listeners) {
            const r = await listener();
        }
    }
}

export const Server = new App();

console.log("App started");
async function a()
{
    console.log(`Server ip ${await Config.ip()}`);
}
a();
