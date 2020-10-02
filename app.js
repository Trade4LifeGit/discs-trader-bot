import Telegraf, {session, Stage} from 'telegraf';
import {TELEGRAM_BOT_KEY} from './constants/constants.js';
import {exploreGame, mainMenu} from "./keyboard/keyboard";
import {greetingText} from "./constants/constants";
import {getGamesFromCore} from "./utils/utils";
import {sellGameScene} from "./scenes/scenes";


const bot = new Telegraf(TELEGRAM_BOT_KEY);
const stage = new Stage([sellGameScene]);
// bot.use(Telegraf.log())
bot.use(session());
bot.use(stage.middleware());

bot.catch(error => {
    console.log('telegraf error', error.response, error.parameters, error.on || error)
});

let currentGameNumb = 0;
let gamesToExplore = [];

bot.start(ctx => ctx.reply(greetingText, mainMenu));

bot.hears('🎮 Я просто смотрю', ctx => {
    getGamesFromCore("PSN", 1, 5).then(result => {
        gamesToExplore = result.data.games;
        bot.telegram.sendPhoto(ctx.from.id,
            gamesToExplore[currentGameNumb].image,
            {
                reply_markup: exploreGame(gamesToExplore[currentGameNumb].image),
                caption: gamesToExplore[currentGameNumb].title + "\n " + gamesToExplore[currentGameNumb].description
            }).then();
    });

});

bot.action('exploreSellGame', ctx => {
    let gameName = ctx.update.callback_query.message.caption.substr(0,
        ctx.update.callback_query.message.caption.indexOf('\n'));
    ctx.scene.enter('sellGameScene', {gameName: gameName});
});

bot.action('exploreNextGame', ctx => {
    // Temporary
    currentGameNumb === gamesToExplore.length - 1 ? currentGameNumb = 0 : currentGameNumb++;
    ctx.editMessageMedia({
        type: "photo",
        media: gamesToExplore[currentGameNumb].image,
        caption: gamesToExplore[currentGameNumb].title + "\n" + gamesToExplore[currentGameNumb].description
    }, {
        reply_markup: exploreGame(gamesToExplore[currentGameNumb].image),
    }).then(() => ctx.answerCbQuery());
});

bot.action('explorePreviousGame', ctx => {
    // Temporary
    currentGameNumb === 0 ? currentGameNumb = gamesToExplore.length - 1 : currentGameNumb--;
    ctx.editMessageMedia({
        type: "photo",
        media: gamesToExplore[currentGameNumb].image,
        caption: gamesToExplore[currentGameNumb].title + "\n" + gamesToExplore[currentGameNumb].description
    }, {
        reply_markup: exploreGame(gamesToExplore[currentGameNumb].image),
    }).then(() => ctx.answerCbQuery());
});

bot.startPolling();


async function startup() {
    await bot.launch()
    console.log(new Date(), 'Bot started as', bot.options.username)
}

startup().then();