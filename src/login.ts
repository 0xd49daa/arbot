import bot from './bot';
import {getSession} from './common';
import fetch from 'node-fetch';
import {getAddress, getBalance} from './arUtils';

export default async function login(ctx: any) {
  const file = await bot.telegram.getFile(
    (ctx.update.message as any).document.file_id
  );
  const response = await fetch(
    `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`
  );
  const data = await response.text();
  const walletFile = JSON.parse(data);

  getSession(ctx).wallet = walletFile;

  ctx.reply(`Valid address ${await getAddress(walletFile)} found ✅`);
  ctx.reply(`Your balance ${await getBalance(walletFile)} AR`);

  getSession(ctx).mode = 'normal';
}
