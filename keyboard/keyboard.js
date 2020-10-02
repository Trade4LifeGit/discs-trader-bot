import {Markup} from "telegraf";
import {
    buyGameButtonText, buyGamesButtonText, cancelButtonText, exploreButtonText, myOffersButtonText, nextGameButtonText,
    previousGameButtonText, sellGameButtonText, sellGamesButtonText, thisGameInPSNButtonText
} from "../constants/constants";

export const mainMenu =
    Markup.keyboard([buyGamesButtonText, sellGamesButtonText, myOffersButtonText, exploreButtonText], {
        columns: 2
    })
        .oneTime()
        .resize()
        .extra()

export const cancelMenu =
    Markup.keyboard([cancelButtonText])
        .oneTime()
        .resize()
        .extra()

export const exploreGame = (psnURL) => {
    return {
        inline_keyboard: [
            [
                {"text": previousGameButtonText, "callback_data": 'explorePreviousGame', "hide": false},
                {"text": nextGameButtonText, "callback_data": 'exploreNextGame', "hide": false}
            ],
            [
                {"text": buyGameButtonText, "callback_data": "test1", "hide": false},
                {"text": sellGameButtonText, "callback_data": 'exploreSellGame', "hide": false}
            ],
            [Markup.urlButton(thisGameInPSNButtonText, psnURL)]
        ],
        "columns": 2
    }
}
