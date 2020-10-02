import {Markup} from "telegraf";
import {cancelButtonText, exploreButtonText} from "../constants/constants";

export const mainMenu =
    Markup.keyboard(['⬅️ Купить игру', '➡️ Продать игру', '🤝 Мои объявления', exploreButtonText], {
        columns: 2
    })
        .oneTime()
        .resize()
        .extra()

export const cancelMenu =
    Markup.keyboard([cancelButtonText]).oneTime().resize().extra()

export const exploreGame = (psnURL) => {
    return {
        inline_keyboard: [
            [
                {"text": "⬅️ Previous", "callback_data": 'explorePreviousGame', "hide": false},
                {"text": "Next ➡️", "callback_data": 'exploreNextGame', "hide": false}
            ],
            [
                {"text": "Buy this game 🤝", "callback_data": "test1", "hide": false},
                {"text": "Sell this game 💰️", "callback_data": 'exploreSellGame', "hide": false}
            ],
            [Markup.urlButton("This game in PSN", psnURL)]
        ],
        "columns": 2
    }
}
