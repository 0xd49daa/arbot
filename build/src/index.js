"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TelegramBot = require("node-telegram-bot-api");
const config = require("config");
const bot = new TelegramBot(config.get('token'), { polling: true });
console.log(bot);
bot.onText(/\/login(.+)/, () => { });
//# sourceMappingURL=index.js.map