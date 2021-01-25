import Telegraf, {session} from 'telegraf';
import {mainMenu} from "./keyboard/keyboard";
import {BOT_STARTED_LOG, GREETING_TEXT, TELEGRAM_BOT_KEY} from "./constants/constants";
import {exploreGamesCommandsComposer} from "./composers/explore_games/exploreGames";
import {sellGamesCommandsComposer} from "./composers/sell_game/sellGame";


const bot = new Telegraf(TELEGRAM_BOT_KEY);
bot.use(session());
bot.use(exploreGamesCommandsComposer);
bot.use(sellGamesCommandsComposer);

bot.catch(error => {
    console.log('telegraf error', error.response, error.parameters, error.on || error)
});

bot.start(ctx => {
    // postUserInfo(ctx).then();
    console.log(BOT_STARTED_LOG(ctx.update.message.from.username));
    ctx.reply(GREETING_TEXT, mainMenu).then();
});

bot.startPolling();

async function startup() {
    await bot.launch()
    console.log(new Date(), 'Bot started as', bot.options.username)
}

startup().then();