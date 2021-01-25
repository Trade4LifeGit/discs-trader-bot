import {Composer, Stage} from "telegraf";
import {SELL_GAMES_BUTTON_TEXT} from "../../constants/constants";
import {findGameScene} from "./scenes/findGameScene";
import {GAMES_PROPOSITIONS_SIZE} from "./constants/constants";
import {sellGameScene} from "./scenes/sellGameScene";

export const sellGamesCommandsComposer = new Composer();
const stage = new Stage([findGameScene, sellGameScene]);
sellGamesCommandsComposer.use(stage.middleware());

sellGamesCommandsComposer.hears(SELL_GAMES_BUTTON_TEXT, ctx => {
    ctx.scene.enter('findGameScene');
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
        ctx.session.chosedIndex = i;
        ctx.scene.enter('sellGameScene');
    })
}
