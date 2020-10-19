import {Composer, session, Stage} from "telegraf";
import {getGamesFromCore} from "../utils/utils";
import {
    BUY_GAME_TEXT_PREFIX,
    FIRST_GAME_WARNING,
    GAMES_PAGE_SIZE,
    mockedOffers,
    PSN_PLATFORM
} from "../constants/constants";
import {buyGameOffersMenu, exploreGame} from "../keyboard/keyboard";
import {sellGameFromExploreScene} from "../scenes/scenes";

export const commandsHandler = new Composer();
const stage = new Stage([sellGameFromExploreScene]);
commandsHandler.use(session());
commandsHandler.use(stage.middleware());

let currentGameNumb = 0;
let gamesToExplore = [];
let currentGamePage = 1;

commandsHandler.hears('🎮 Я просто смотрю', ctx => {
    getGamesFromCore(PSN_PLATFORM, 1, GAMES_PAGE_SIZE).then(result => {
        gamesToExplore = result.data.games;
        ctx.replyWithPhoto(gamesToExplore[currentGameNumb].image,
            {
                reply_markup: exploreGame(gamesToExplore[currentGameNumb].psnURL),
                caption: gamesToExplore[currentGameNumb].title
            }).then();
    });
});

commandsHandler.action('exploreNextGame', ctx => {
    if (currentGameNumb === gamesToExplore.length - 1){
        currentGamePage++
        getGamesFromCore(PSN_PLATFORM, currentGamePage, GAMES_PAGE_SIZE).then(result => {
            gamesToExplore = gamesToExplore.concat(result.data.games);
            currentGameNumb++;
            ctx.editMessageMedia({
                type: "photo",
                media: gamesToExplore[currentGameNumb].image,
                caption: gamesToExplore[currentGameNumb].title
            }, {
                reply_markup: exploreGame(gamesToExplore[currentGameNumb].psnURL),
            }).then(() => ctx.answerCbQuery());
        })
    } else {
        currentGameNumb++
        ctx.editMessageMedia({
            type: "photo",
            media: gamesToExplore[currentGameNumb].image,
            caption: gamesToExplore[currentGameNumb].title
        }, {
            reply_markup: exploreGame(gamesToExplore[currentGameNumb].psnURL),
        }).then(() => ctx.answerCbQuery());
    }

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
    ctx.scene.enter('sellGameFromExploreScene', {gameName: gameName});
});

commandsHandler.action('exploreBuyGame', ctx => {
    ctx.reply(BUY_GAME_TEXT_PREFIX(ctx.update.callback_query.message.caption),
        {reply_markup: buyGameOffersMenu(mockedOffers)}).then()
})