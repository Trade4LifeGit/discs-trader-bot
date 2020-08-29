import {Markup} from "telegraf";

export const gamesKeyboard =
    Markup.keyboard(['Назад','Меню', 'Вперёд'], {
        columns: parseInt(3)
    })
        .oneTime()
        .resize()
        .extra()