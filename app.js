import Telegraf, {Markup} from 'telegraf';
import {firstMenu} from './menu/menu'
import {mockedGames, TELEGRAM_BOT_KEY} from './constants/constants.js';

const bot = new Telegraf(TELEGRAM_BOT_KEY);
// bot.use(Telegraf.log());

bot.catch(error => {
  console.log('telegraf error', error.response, error.parameters, error.on || error)
});

bot.use(firstMenu.init());
bot.startPolling();


async function startup() {
  await bot.launch()
  console.log(new Date(), 'Bot started as', bot.options.username)
}

startup();