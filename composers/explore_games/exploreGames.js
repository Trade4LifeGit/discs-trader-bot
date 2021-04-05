import {Composer, Stage} from "telegraf";
import {EXPLORE_BUTTON_TEXT, PSN_PLATFORM} from "../../constants";
import {exploreGame} from "./keyboards/exploreButtons";
import {buyGameOffersMenu} from "./keyboards/offersBuyGameMenu";
import {BUY_GAME_TEXT_PREFIX, GAMES_PAGE_SIZE} from "./constants/constants";
import {sellGameFromExploreScene} from "./scenes/sellGame";
import {getGamesFromCore} from "./utils/getGamesFromCore";
import {nextGame} from "./utils/nextGame";
import {previousGame} from "./utils/previousGame";

export const exploreGamesCommandsComposer = new Composer();
const stage = new Stage([sellGameFromExploreScene]);
exploreGamesCommandsComposer.use(stage.middleware());

let paginatedItem;

exploreGamesCommandsComposer.hears(EXPLORE_BUTTON_TEXT, ctx => {
    getGamesFromCore(PSN_PLATFORM, 0, GAMES_PAGE_SIZE).then(result => {
        paginatedItem = {
            totalPages: result.data.totalPages,
            games: result.data.offerGames,
            page: 0,
            index: 0,
        }
        ctx.replyWithPhoto(paginatedItem.games[0].game.image,
            {
                reply_markup: exploreGame(paginatedItem.games[0].game.psnURL),
                caption: paginatedItem.games[0].game.title
            }).then();
    }).catch(error => {
        console.log("Request exception on explore ", error)
    });
});

/**
 *  В слудеющем коде (листании вперёд и назад) может случаться коллизия, если нажимать на кнопку, пока
 * предыдущее нажатие кнопки не было обработано. Ничего страшного не случится при наличии обычного списка,
 * но если в списке всего 2-3 элемента, при быстром нажатии может падать исключение в консоль
 * */

exploreGamesCommandsComposer.action('exploreNextGame', ctx => {
    nextGame(ctx, paginatedItem);
});

exploreGamesCommandsComposer.action('explorePreviousGame', ctx => {
    previousGame(ctx, paginatedItem);
});

exploreGamesCommandsComposer.action('exploreSellGame', ctx => {
    let gameName = ctx.update.callback_query.message.caption;
    ctx.scene.enter('sellGameFromExploreScene', {gameName: gameName,
        gameId: paginatedItem.games[paginatedItem.index].game.id});
});

exploreGamesCommandsComposer.action('exploreBuyGame', ctx => {
    ctx.reply(BUY_GAME_TEXT_PREFIX(ctx.update.callback_query.message.caption),
        {reply_markup: buyGameOffersMenu(paginatedItem.games[paginatedItem.index].offers)}).then()
})