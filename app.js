import Telegraf, {Extra, Markup, Telegram} from 'telegraf';
import {TELEGRAM_BOT_KEY} from './constants/constants.js';
import {exploreGame, exploreMenu, mainMenu} from "./keyboard/keyboard";
import {greetingText, mockedGames} from "./constants/constants";
import {firstMenu} from "./menu/menu";
import {generateMessageOptions} from "./utils/utils";

const bot = new Telegraf(TELEGRAM_BOT_KEY);

bot.catch(error => {
    console.log('telegraf error', error.response, error.parameters, error.on || error)
});

bot.start(ctx => ctx.reply(greetingText, mainMenu));

// Сюда передать внешнюю переменную для перелистывания игр через кнопки
bot.hears('🎮 Я просто смотрю', ctx => {
    bot.telegram.sendPhoto(ctx.from.id,
        mockedGames.games[0].pictureURL,
        {
            "reply_markup": exploreGame(mockedGames.games[0].name,
                mockedGames.games[0].caption,
                // here below should be psn link
                mockedGames.games[0].pictureURL),
            caption: mockedGames.games[0].name + " " + mockedGames.games[0].caption
        });
});

bot.startPolling();


async function startup() {
    await bot.launch()
    console.log(new Date(), 'Bot started as', bot.options.username)
}

startup();