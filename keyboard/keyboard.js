import {Markup} from "telegraf";
import {
    BUY_GAME_BUTTON_TEXT,
    BUY_GAMES_BUTTON_TEXT,
    CANCEL_BUTTON_TEXT,
    EXPLORE_BUTTON_TEXT,
    MY_OFFERS_BUTTON_TEXT,
    NEXT_GAME_BUTTON_TEXT,
    PREVIOUS_GAME_BUTTON_TEXT,
    SELL_GAME_BUTTON_TEXT,
    SELL_GAMES_BUTTON_TEXT, TELEGRAM_LINK_PREFIX,
    THIS_GAME_IN_PSN_BUTTON_TEXT
} from "../constants/constants";

export const mainMenu =
    Markup.keyboard([BUY_GAMES_BUTTON_TEXT, SELL_GAMES_BUTTON_TEXT, MY_OFFERS_BUTTON_TEXT, EXPLORE_BUTTON_TEXT], {
        columns: 2
    })
        .oneTime()
        .resize()
        .extra()

export const cancelMenu =
    Markup.keyboard([CANCEL_BUTTON_TEXT])
        .oneTime()
        .resize()
        .extra()

export const buyGameOffersMenu = (offers) => {
    let offersAsButtons = [];
    for (let i = 0; i < offers.length; i++){
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

export const proposedTitlesMenu = (proposedTitles) => {
    let propositionsAsButtons = [];
    for (let i = 0; i < proposedTitles.length; i++) {
        let proposition = proposedTitles[i];
        propositionsAsButtons.push(
            [Markup.callbackButton(proposition,'propositionSelected' + i, false)]
        )
    }
    return {
        inline_keyboard: propositionsAsButtons,
        "columns": 1
    }
}

export const exploreGame = (psnURL) => {
    return {
        inline_keyboard: [
            [
                {"text": PREVIOUS_GAME_BUTTON_TEXT, "callback_data": 'explorePreviousGame', "hide": false},
                {"text": NEXT_GAME_BUTTON_TEXT, "callback_data": 'exploreNextGame', "hide": false}
            ],
            [
                {"text": BUY_GAME_BUTTON_TEXT, "callback_data": 'exploreBuyGame', "hide": false},
                {"text": SELL_GAME_BUTTON_TEXT, "callback_data": 'exploreSellGame', "hide": false}
            ],
            [Markup.urlButton(THIS_GAME_IN_PSN_BUTTON_TEXT, psnURL)]
        ],
        "columns": 2
    }
}
