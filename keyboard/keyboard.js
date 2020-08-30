import {Markup} from "telegraf";

export const mainMenu =
    Markup.keyboard(['⬅️ Купить игру','➡️ Продать игру', '🤝 Мои объявления', '🎮 Я просто смотрю'], {
        columns: 2
    })
        .oneTime()
        .resize()
        .extra()