import {Composer, session, Stage} from "telegraf";
import {getGamesFromCore} from "../utils/utils";
import {FIRST_GAME_WARNING, GAMES_PAGE_SIZE, PSN_PLATFORM} from "../constants/constants";
import {exploreGame} from "../keyboard/keyboard";
import {sellGameScene} from "../scenes/scenes";

export const commandsHandler = new Composer();
const stage = new Stage([sellGameScene]);
commandsHandler.use(session());
commandsHandler.use(stage.middleware());

// move to session, think of using scenes here. Some shit going on with indexes
let currentGameNumb = 0;
let gamesToExplore = [];
let currentGamePage = 1;

commandsHandler.hears('🎮 Я просто смотрю', ctx => {
    getGamesFromCore(PSN_PLATFORM, currentGamePage, GAMES_PAGE_SIZE).then(result => {
        gamesToExplore = result.data.games;
        ctx.replyWithPhoto(gamesToExplore[currentGameNumb].image,
            {
                reply_markup: exploreGame(gamesToExplore[currentGameNumb].psnURL),
                caption: gamesToExplore[currentGameNumb].title
            }).then();
    });
});

commandsHandler.action('exploreNextGame', ctx => {
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

commandsHandler.action('explorePreviousGame', ctx => {
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

commandsHandler.action('exploreSellGame', ctx => {
    let gameName = ctx.update.callback_query.message.caption;
    ctx.scene.enter('sellGameScene', {gameName: gameName});
});