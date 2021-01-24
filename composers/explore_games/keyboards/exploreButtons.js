import {Markup} from "telegraf";
import {
    BUY_GAME_BUTTON_TEXT,
    NEXT_GAME_BUTTON_TEXT,
    PREVIOUS_GAME_BUTTON_TEXT,
    SELL_GAME_BUTTON_TEXT,
    THIS_GAME_IN_PSN_BUTTON_TEXT
} from "../constants/constants";

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