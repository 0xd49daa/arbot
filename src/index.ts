import * as dotenv from 'dotenv';
dotenv.config();

import {checkIfLogged, getSession} from './common';
import login from './login';
import bot from './bot';
import {
  decryptString,
  encryptString,
  getAddress,
  getBalance,
  getTxs,
} from './arUtils';
import {encryptData} from './crypto';

bot.command('login', ctx => {
  getSession(ctx).mode = 'login';
  ctx.reply('Attach your arweave wallet as a next message here');
});

bot.command('balance', async ctx => {
  if (!checkIfLogged(ctx)) {
    return;
  }

  ctx.reply(`${await getBalance(getSession(ctx).wallet)} AR`);
});

bot.command('address', async ctx => {
  if (!checkIfLogged(ctx)) {
    return;
  }

  ctx.reply(`${await getAddress(getSession(ctx).wallet)}`);
});

bot.on('message', async ctx => {
  if (getSession(ctx).mode === 'login') {
    await login(ctx);
  }

  const message = ctx.update.message as any;

  const raw = JSON.stringify({
    date: message.date,
    text: message.text,
  });

  const enc = await encryptString(getSession(ctx).wallet, raw);

  console.log('encrypted', enc);
  console.log('decrypted', await decryptString(getSession(ctx).wallet, enc));
});

bot.launch();
