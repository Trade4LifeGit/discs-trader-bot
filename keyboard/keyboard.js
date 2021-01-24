import {Markup} from "telegraf";
import {
    BUY_GAMES_BUTTON_TEXT,
    CANCEL_BUTTON_TEXT,
    EXPLORE_BUTTON_TEXT,
    MY_OFFERS_BUTTON_TEXT,
    SELL_GAMES_BUTTON_TEXT
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