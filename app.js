import Telegraf, {session, Stage} from 'telegraf';
import {TELEGRAM_BOT_KEY} from './constants/constants.js';
import {exploreGame, mainMenu} from "./keyboard/keyboard";
import {FIRST_GAME_WARNING, GAMES_PAGE_SIZE, greetingText, PSN_PLATFORM} from "./constants/constants";
import {getGamesFromCore, postUserInfo} from "./utils/utils";
import {sellGameScene} from "./scenes/scenes";


const bot = new Telegraf(TELEGRAM_BOT_KEY);
const stage = new Stage([sellGameScene]);
// bot.use(Telegraf.log())
bot.use(session());
bot.use(stage.middleware());

bot.catch(error => {
    console.log('telegraf error', error.response, error.parameters, error.on || error)
});

// move to session, think of using scenes here. Some shit going on with indexes
let currentGameNumb = 0;
let gamesToExplore = [];
let currentGamePage = 1;

bot.start(ctx => {
    postUserInfo(ctx).then();
    ctx.reply(greetingText, mainMenu).then();
});

bot.hears('🎮 Я просто смотрю', ctx => {
    getGamesFromCore(PSN_PLATFORM, currentGamePage, GAMES_PAGE_SIZE).then(result => {
        gamesToExplore = result.data.games;
        bot.telegram.sendPhoto(ctx.from.id,
            gamesToExplore[currentGameNumb].image,
            {
                reply_markup: exploreGame(gamesToExplore[currentGameNumb].psnURL),
                caption: gamesToExplore[currentGameNumb].title
            }).then();
    });
});

bot.action('exploreNextGame', ctx => {
    if (currentGameNumb === gamesToExplore.length - 2){
        currentGamePage++
        getGamesFromCore(PSN_PLATFORM, currentGamePage, GAMES_PAGE_SIZE).then(result => {
            gamesToExplore = gamesToExplore.concat(result.data.games);
        })
        currentGameNumb++
    } else {
        currentGameNumb++
    }
    ctx.editMessageMedia({
        type: "photo",
        media: gamesToExplore[currentGameNumb].image,
        caption: gamesToExplore[currentGameNumb].title
    }, {
        reply_markup: exploreGame(gamesToExplore[currentGameNumb].psnURL),
    }).then(() => ctx.answerCbQuery());
});

bot.action('explorePreviousGame', ctx => {
    if (currentGameNumb === 0){
        ctx.answerCbQuery(FIRST_GAME_WARNING).then();
    } else {
        currentGameNumb--
        ctx.editMessageMedia({
            type: "photo",
            media: gamesToExplore[currentGameNumb].image,
            caption: gamesToExplore[currentGameNumb].title
        }, {
            reply_markup: exploreGame(gamesToExplore[currentGameNumb].psnURL),
        }).then(() => ctx.answerCbQuery());
    }
});

bot.action('exploreSellGame', ctx => {
    let gameName = ctx.update.callback_query.message.caption;
    ctx.scene.enter('sellGameScene', {gameName: gameName});
});

bot.startPolling();

async function startup() {
    await bot.launch()
    console.log(new Date(), 'Bot started as', bot.options.username)
}

startup().then();