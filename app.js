import Telegraf, {Extra, Markup} from 'telegraf';
import {TELEGRAM_BOT_KEY} from './constants/constants.js';
import {mainMenu} from "./keyboard/keyboard";
import {greetingText} from "./constants/constants";
import {firstMenu} from "./menu/menu";

const bot = new Telegraf(TELEGRAM_BOT_KEY);
// bot.use(Telegraf.log());

bot.catch(error => {
  console.log('telegraf error', error.response, error.parameters, error.on || error)
});

bot.start(ctx => ctx.reply(greetingText, mainMenu));

const keyboard = Markup.inlineKeyboard([
  Markup.urlButton('❤️', 'http://telegraf.js.org'),
  Markup.callbackButton('Delete', 'delete')
])

bot.hears('⬅️ Купить игру', ctx => ctx.reply('xui', Extra.markup(keyboard)));

// bot.use(firstMenu.init());
bot.startPolling();


async function startup() {
  await bot.launch()
  console.log(new Date(), 'Bot started as', bot.options.username)
}

startup();