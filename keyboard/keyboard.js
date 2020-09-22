import {Markup} from "telegraf";

export const mainMenu =
    Markup.keyboard(['⬅️ Купить игру', '➡️ Продать игру', '🤝 Мои объявления', '🎮 Я просто смотрю'], {
        columns: 2
    })
        .oneTime()
        .resize()
        .extra()

export const exploreMenu = {
    "inline_keyboard": [
        [{"text": "test button", "callback_data": "test", "hide": false}, {"text": "test button 2", "callback_data": "test2", "hide": false}],
        [{"text": "test button 3", "callback_data": "test3", "hide": false}]
    ],
    "columns": 2
}

export const exploreGame = (psnURL) => {
    return {
        inline_keyboard: [
            [
                {"text": "⬅️ Previous", "callback_data": "test1", "hide": false},
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