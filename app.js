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
            "reply_markup": exploreGame(mockedGames.games[currentGameNumb].name,
                mockedGames.games[currentGameNumb].caption,
                mockedGames.games[currentGameNumb].psnPageURL),
            caption: mockedGames.games[currentGameNumb].name + "\n " + mockedGames.games[currentGameNumb].caption
        });
});

bot.action('exploreNextGame', (ctx) => {
    const chatID = ctx.update.callback_query.message.chat.id;
    const messageID = ctx.update.callback_query.message.message_id;
    const inlineMessageID = ctx.update.callback_query.inline_message_id;
    console.log(chatID, " ", messageID, " ", inlineMessageID);

    // here increment current game number

    ctx.editMessageMedia({
        type: "photo",
        media: mockedGames.games[1].pictureURL
    });

    ctx.editMessageCaption("123", exploreGame(mockedGames.games[1].name,
        mockedGames.games[1].caption,
        mockedGames.games[1].psnPageURL))
})

bot.startPolling();


async function startup() {
    await bot.launch()
    console.log(new Date(), 'Bot started as', bot.options.username)
}

startup();