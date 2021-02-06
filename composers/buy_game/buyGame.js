import {Composer, Stage} from "telegraf";
import {BUY_GAMES_BUTTON_TEXT} from "../../constants";
import {buyFindGameScene} from "./scenes/buyFindGameScene";
import {GAMES_PROPOSITIONS_SIZE} from "./constants/constants";
import {buyGameScene} from "./scenes/buyGameScene";

export const buyGameCommandsComposer = new Composer();
const stage = new Stage([buyFindGameScene, buyGameScene]);
buyGameCommandsComposer.use(stage.middleware());

buyGameCommandsComposer.hears(BUY_GAMES_BUTTON_TEXT, ctx => {
    ctx.scene.enter('buyFindGameScene');
})

for (let i = 0; i < GAMES_PROPOSITIONS_SIZE; i++){
    buyGameCommandsComposer.action('buyPropositionSelected' + i, ctx => {
        ctx.session.chosedIndex = i;
        ctx.scene.enter('buyGameScene');
    })
}