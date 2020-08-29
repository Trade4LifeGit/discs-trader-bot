import TelegrafInlineMenu from "telegraf-inline-menu";
import {mockedGames} from "../constants/constants";

export const firstMenu = new TelegrafInlineMenu(ctx => `Здравствуй, ${ctx.from.first_name + ' ' + (ctx.from.last_name ? ctx.from.last_name : '')}!`);
firstMenu.setCommand('start');
firstMenu.simpleButton('Продажа', 'a', {
    doFunc: ctx => ctx.answerCbQuery('Поздравляю! Вы ищите чего бы продать!')
});
firstMenu.simpleButton('Покупка', 'b', {
    doFunc: ctx => ctx.answerCbQuery('Поздравляю! Вы ищите чего бы купить!'),
    joinLastRow: true,
});
firstMenu.simpleButton('Мои объявления', 'c', {
    doFunc: ctx => ctx.answerCbQuery('Поздравляю! Вы решили посмотреть на свои лоты!')
});

let currentGameNumber = 0;

firstMenu.submenu('Я просто смотрю', 'explore', new TelegrafInlineMenu(() => mockedGames.games[currentGameNumber].name, {
    photo: () => {
        return mockedGames.games[currentGameNumber].pictureURL
    }
}))
    .setCommand('explore')
    .simpleButton('Назад', 'a', {
        doFunc: async () => {
            currentGameNumber--
        }
    })
    .simpleButton('В меню', 'b', {
        doFunc: async ctx => ctx.answerCbQuery('Just a callback query answer'),
        joinLastRow: true
    })
    .simpleButton('Вперёд', 'c', {
        doFunc: async () => {
            currentGameNumber++
        },
        joinLastRow: true
    })