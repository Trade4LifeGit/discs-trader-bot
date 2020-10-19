import {Markup} from "telegraf";
import {
    buyGameButtonText,
    buyGamesButtonText,
    cancelButtonText,
    exploreButtonText,
    mockedOffers,
    myOffersButtonText,
    nextGameButtonText,
    previousGameButtonText,
    sellGameButtonText,
    sellGamesButtonText, TELEGRAM_LINK_PREFIX,
    thisGameInPSNButtonText
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

export const buyGameOffersMenu = (offers) => {
    let offersAsButtons = [];
    for (let i = 0; i < offers.length; i++){
        console.log("test")
        let offer = offers[i];
        offersAsButtons.push(
            [Markup.urlButton(offer.cost.concat(' ').concat(offer.telegramNickname),
                    TELEGRAM_LINK_PREFIX.concat(offer.telegramNickname), false)]
        );
    }
    return {
        inline_keyboard: offersAsButtons,
        "columns": 1
    }
}

export const exploreGame = (psnURL) => {
    return {
        inline_keyboard: [
            [
                {"text": previousGameButtonText, "callback_data": 'explorePreviousGame', "hide": false},
                {"text": nextGameButtonText, "callback_data": 'exploreNextGame', "hide": false}
            ],
            [
                {"text": buyGameButtonText, "callback_data": 'exploreBuyGame', "hide": false},
                {"text": sellGameButtonText, "callback_data": 'exploreSellGame', "hide": false}
            ],
            [Markup.urlButton(thisGameInPSNButtonText, psnURL)]
        ],
        "columns": 2
    }
}
