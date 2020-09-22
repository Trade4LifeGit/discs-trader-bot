import Telegraf, {Extra, Markup, Telegram} from 'telegraf';
import {TELEGRAM_BOT_KEY} from './constants/constants.js';
import {exploreGame, exploreMenu, mainMenu} from "./keyboard/keyboard";
import {greetingText, mockedGames} from "./constants/constants";


const bot = new Telegraf(TELEGRAM_BOT_KEY);

bot.catch(error => {
    console.log('telegraf error', error.response, error.parameters, error.on || error)
});

bot.start(ctx => ctx.reply(greetingText, mainMenu));

let currentGameNumb = 0;

// Сюда передать внешнюю переменную для перелистывания игр через кнопки
bot.hears('🎮 Я просто смотрю', ctx => {
    bot.telegram.sendPhoto(ctx.from.id,
        mockedGames.games[currentGameNumb].pictureURL,
        {
            reply_markup: exploreGame(mockedGames.games[currentGameNumb].psnPageURL),
            caption: mockedGames.games[currentGameNumb].name + "\n " + mockedGames.games[currentGameNumb].caption
        });
});

bot.action('exploreNextGame', (ctx) => {
    currentGameNumb = currentGameNumb + 1;
    ctx.editMessageMedia({
        type: "photo",
        media: mockedGames.games[currentGameNumb].pictureURL
    });

    ctx.editMessageCaption(mockedGames.games[currentGameNumb].name + "\n" + mockedGames.games[currentGameNumb].caption,
        {
            reply_markup: exploreGame(mockedGames.games[currentGameNumb].psnPageURL)
        }
    )
})

bot.startPolling();


async function startup() {
    await bot.launch()
    console.log(new Date(), 'Bot started as', bot.options.username)
}

startup();