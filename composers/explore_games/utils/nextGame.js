import {getGamesFromCore} from "./getGamesFromCore";
import {PSN_PLATFORM} from "../../../constants/constants";
import {GAMES_PAGE_SIZE} from "../constants/constants";
import {updateGameMessage} from "./updateGameMessage";

export const nextGame = (ctx, paginatedItem) => {

    if (paginatedItem.index === paginatedItem.games.length - 1
        && paginatedItem.page === paginatedItem.totalPages - 1){

        // If it is the last game on the last page

        getGamesFromCore(PSN_PLATFORM, 0, GAMES_PAGE_SIZE).then(result => {

            paginatedItem.games = result.data.offerGames;
            paginatedItem.page = 0;
            paginatedItem.index = 0;

            let game = paginatedItem.games[0].game;
            updateGameMessage(ctx, game.image, game.title, game.psnURL);
            console.log("last game last page")
        });

    } else if (paginatedItem.index === paginatedItem.games.length - 1
        && paginatedItem.page !== paginatedItem.totalPages - 1){

        // If it is the last game on the page

        paginatedItem.page ++;

        getGamesFromCore(PSN_PLATFORM, paginatedItem.page, GAMES_PAGE_SIZE).then(result => {

            paginatedItem.games = result.data.offerGames;
            paginatedItem.index = 0;

            let game = paginatedItem.games[paginatedItem.index].game;
            updateGameMessage(ctx, game.image, game.title, game.psnURL);
            console.log("last game")
        });

    } else {

        // If it is just next game on the page

        paginatedItem.index ++;

        let game = paginatedItem.games[paginatedItem.index].game;
        updateGameMessage(ctx, game.image, game.title, game.psnURL);
        console.log("next game")
    }
}