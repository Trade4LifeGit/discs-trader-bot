import Telegraf, {session} from 'telegraf';
import {TELEGRAM_BOT_KEY} from './constants/constants.js';
import {mainMenu} from "./keyboard/keyboard";
import {GREETING_TEXT} from "./constants/constants";
import {postUserInfo} from "./utils/utils";
import {exploreGamesCommandsComposer} from "./composers/explore_games/exploreGames";
import {sellGamesCommandsComposer} from "./commands/sellGame";


const bot = new Telegraf(TELEGRAM_BOT_KEY);
bot.use(session());
bot.use(exploreGamesCommandsComposer);
bot.use(sellGamesCommandsComposer);

bot.catch(error => {
    console.log('telegraf error', error.response, error.parameters, error.on || error)
});

bot.start(ctx => {
    postUserInfo(ctx).then();
    ctx.reply(GREETING_TEXT, mainMenu).then();
});

bot.startPolling();

async function startup() {
    await bot.launch()
    console.log(new Date(), 'Bot started as', bot.options.username)
}

startup().then();