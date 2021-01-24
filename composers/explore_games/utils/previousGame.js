import {getGamesFromCore} from "./getGamesFromCore";
import {PSN_PLATFORM} from "../../../constants/constants";
import {GAMES_PAGE_SIZE} from "../constants/constants";
import {updateGameMessage} from "./updateGameMessage";

export const previousGame = (ctx, paginatedItem) => {

    if (paginatedItem.index === 0 && paginatedItem.page === 0){

        // If it is the first game on the first page

        getGamesFromCore(PSN_PLATFORM, paginatedItem.totalPages - 1, GAMES_PAGE_SIZE).then(result => {

            paginatedItem.games = result.data.offerGames;
            paginatedItem.page = paginatedItem.totalPages - 1;
            paginatedItem.index = paginatedItem.games.length - 1;

            let game = paginatedItem.games[paginatedItem.index].game;
            updateGameMessage(ctx, game.image, game.title, game.psnURL);

        });

    } else if (paginatedItem.index === 0 && paginatedItem.page !== 0){

        // If it is the first game on the page

        paginatedItem.page --;

        getGamesFromCore(PSN_PLATFORM, paginatedItem.page, GAMES_PAGE_SIZE).then(result => {

            paginatedItem.games = result.data.offerGames;
            paginatedItem.index = paginatedItem.games - 1;

            let game = paginatedItem.games[paginatedItem.page].game;
            updateGameMessage(ctx, game.image, game.title, game.psnURL);

        });

    } else {

        // If it is just previous game on the page

        paginatedItem.index --;

        let game = paginatedItem.games[paginatedItem.page].game;
        updateGameMessage(ctx, game.image, game.title, game.psnURL);

    }
}