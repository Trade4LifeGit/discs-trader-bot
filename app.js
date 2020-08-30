import Telegraf, {Extra, Markup} from 'telegraf';
import {TELEGRAM_BOT_KEY} from './constants/constants.js';
import {exploreMenu, mainMenu} from "./keyboard/keyboard";
import {greetingText, mockedGames} from "./constants/constants";
import {firstMenu} from "./menu/menu";

const bot = new Telegraf(TELEGRAM_BOT_KEY);
// bot.use(Telegraf.log());

bot.catch(error => {
  console.log('telegraf error', error.response, error.parameters, error.on || error)
});

bot.start(ctx => ctx.reply(greetingText, mainMenu));

// Сюда передать внешнюю переменную для перелистывания игр через кнопки
bot.hears('🎮 Я просто смотрю', ctx => {
  // ctx.reply({url: mockedGames.games[0].pictureURL}, Extra.markup(exploreMenu))
  ctx.reply({text: 'Picture caption' + mockedGames.games[0].pictureURL}, Extra.markup(exploreMenu))
});

// bot.use(firstMenu.init());
bot.startPolling();


async function startup() {
  await bot.launch()
  console.log(new Date(), 'Bot started as', bot.options.username)
}

startup();