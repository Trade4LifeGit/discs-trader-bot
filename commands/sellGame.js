import {Composer, Stage} from "telegraf";
import {sellGameScene} from "../scenes/scenes";
import {GAMES_PROPOSITIONS_SIZE, SELL_GAMES_BUTTON_TEXT} from "../constants/constants";

export const sellGamesCommandsComposer = new Composer();
const stage = new Stage([sellGameScene]);
sellGamesCommandsComposer.use(stage.middleware());

sellGamesCommandsComposer.hears(SELL_GAMES_BUTTON_TEXT, ctx => {
    ctx.scene.enter('sellGameScene');
});

/** Странная конструкция, требующая пояснения (и, возмножно, переделки):
 * Сложность здесь в том, что невозможно вставить в callbackButton параметр (а именно - название игры),
 * а значит - невозмножно понять какая кнопка была нажата. Inline_keyboard принимает только
 * callbackButton. Данная тупая идея - сделать по обработчику команды на каждую кнопку, параметризировать
 * propositionSelected + номер_опции, а на обработчике смотреть в предыдущем сообщении какие были опции и
 * понимать какая была выбрана игра.
 * */
for (let i = 0; i < GAMES_PROPOSITIONS_SIZE; i++){
    sellGamesCommandsComposer.action('propositionSelected' + i, ctx => {
        console.log(i, ctx.callbackQuery.message.reply_markup.inline_keyboard[i][0].text);
    })
}
