import {Markup} from "telegraf";

export const mainMenu =
    Markup.keyboard(['⬅️ Купить игру', '➡️ Продать игру', '🤝 Мои объявления', '🎮 Я просто смотрю'], {
        columns: 2
    })
        .oneTime()
        .resize()
        .extra()

export const exploreGame = (psnURL) => {
    return {
        inline_keyboard: [
            [
                {"text": "⬅️ Previous", "callback_data": 'explorePreviousGame', "hide": false},
                {"text": "Next ➡️", "callback_data": 'exploreNextGame', "hide": false}
            ],
            [
                {"text": "Buy this game 🤝", "callback_data": "test1", "hide": false},
                {"text": "Sell this game 💰️", "callback_data": "test2", "hide": false}
            ],
            [Markup.urlButton("This game in PSN", psnURL)]
        ],
        "columns": 2
    }

}