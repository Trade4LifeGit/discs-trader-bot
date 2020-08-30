import Telegraf, {Extra, Markup} from 'telegraf';
import {TELEGRAM_BOT_KEY} from './constants/constants.js';
import {exploreMenu, mainMenu} from "./keyboard/keyboard";
import {greetingText} from "./constants/constants";
import {firstMenu} from "./menu/menu";

const bot = new Telegraf(TELEGRAM_BOT_KEY);
// bot.use(Telegraf.log());

bot.catch(error => {
  console.log('telegraf error', error.response, error.parameters, error.on || error)
});

bot.start(ctx => ctx.reply(greetingText, mainMenu));

// Сюда передать внешнюю переменную для перелистывания игр через кнопки
bot.hears('🎮 Я просто смотрю', ctx => {
  ctx.replyWithPhoto('https://store.playstation.com/store/api/chihiro/00_09_000/container/RU/ru/999/EP4497-CUSA165' +
      '79_00-00000000000000P1/1596558946000/image?w=240&h=240&bg_color=000000&opacity=100&_version=00_09_000')
      .then(() =>   ctx.reply('Передать сюда текст (название игры)', Extra.markup(exploreMenu))
  )
});

// bot.use(firstMenu.init());
bot.startPolling();


async function startup() {
  await bot.launch()
  console.log(new Date(), 'Bot started as', bot.options.username)
}

startup();