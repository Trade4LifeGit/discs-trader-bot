import {Composer, Stage} from "telegraf";
import {getGamesFromCore, updateGameMessageOnExplore} from "../utils/utils";
import {
    BUY_GAME_TEXT_PREFIX, EXPLORE_BUTTON_TEXT,
    GAMES_PAGE_SIZE,
    mockedOffers,
    PSN_PLATFORM
} from "../constants/constants";
import {buyGameOffersMenu, exploreGame} from "../keyboard/keyboard";
import {sellGameFromExploreScene} from "../scenes/scenes";

export const exploreGamesCommandsComposer = new Composer();
const stage = new Stage([sellGameFromExploreScene]);
exploreGamesCommandsComposer.use(stage.middleware());

let currentGameNumb = 0;
let currentGamePage = 0;
let gamesToExplore;
let totalPages;
let totalGames;

exploreGamesCommandsComposer.hears(EXPLORE_BUTTON_TEXT, ctx => {
    getGamesFromCore(PSN_PLATFORM, currentGamePage, GAMES_PAGE_SIZE).then(result => {
        gamesToExplore = result.data.games;
        totalGames = result.data.totalGames;
        totalPages = result.data.totalPages;
        ctx.replyWithPhoto(gamesToExplore[currentGameNumb].image,
            {
                reply_markup: exploreGame(gamesToExplore[currentGameNumb].psnURL),
                caption: gamesToExplore[currentGameNumb].title
            }).then();
    });
});

exploreGamesCommandsComposer.action('exploreNextGame', ctx => {
    if (currentGameNumb === gamesToExplore.length - 1 && currentGamePage === totalPages - 1){
        getGamesFromCore(PSN_PLATFORM, 0, GAMES_PAGE_SIZE).then(result => {
            gamesToExplore = result.data.games;
            currentGamePage = 0;
            currentGameNumb = 0;
            let currentGame = gamesToExplore[currentGameNumb];
            updateGameMessageOnExplore(ctx, currentGame.image, currentGame.title, currentGame.psnURL);
        });
    } else if (currentGameNumb === gamesToExplore.length - 1 && currentGamePage !== totalPages - 1){
        currentGamePage ++;
        getGamesFromCore(PSN_PLATFORM, currentGamePage, GAMES_PAGE_SIZE).then(result => {
            gamesToExplore = result.data.games;
            currentGameNumb = 0;
            let currentGame = gamesToExplore[currentGameNumb];
            updateGameMessageOnExplore(ctx, currentGame.image, currentGame.title, currentGame.psnURL);
        });
    } else {
        currentGameNumb++;
        let currentGame = gamesToExplore[currentGameNumb];
        updateGameMessageOnExplore(ctx, currentGame.image, currentGame.title, currentGame.psnURL);
    }

});

exploreGamesCommandsComposer.action('explorePreviousGame', ctx => {
    if (currentGameNumb === 0 && currentGamePage === 0){
        getGamesFromCore(PSN_PLATFORM, totalPages - 1, GAMES_PAGE_SIZE).then(result => {
            gamesToExplore = result.data.games;
            currentGamePage = totalPages - 1;
            currentGameNumb = gamesToExplore.length - 1;
            let currentGame = gamesToExplore[currentGameNumb];
            updateGameMessageOnExplore(ctx, currentGame.image, currentGame.title, currentGame.psnURL);
        });
    } else if (currentGameNumb === 0 && currentGamePage !== 0){
        currentGamePage --;
        getGamesFromCore(PSN_PLATFORM, currentGamePage, GAMES_PAGE_SIZE).then(result => {
            gamesToExplore = result.data.games;
            currentGameNumb = gamesToExplore.length - 1;
            let currentGame = gamesToExplore[currentGameNumb];
            updateGameMessageOnExplore(ctx, currentGame.image, currentGame.title, currentGame.psnURL);
        })
    } else {
        currentGameNumb--;
        let currentGame = gamesToExplore[currentGameNumb];
        updateGameMessageOnExplore(ctx, currentGame.image, currentGame.title, currentGame.psnURL);
    }
});


exploreGamesCommandsComposer.action('exploreSellGame', ctx => {
    let gameName = ctx.update.callback_query.message.caption;
    ctx.scene.enter('sellGameFromExploreScene', {gameName: gameName});
});

exploreGamesCommandsComposer.action('exploreBuyGame', ctx => {
    ctx.reply(BUY_GAME_TEXT_PREFIX(ctx.update.callback_query.message.caption),
        {reply_markup: buyGameOffersMenu(mockedOffers)}).then()
})