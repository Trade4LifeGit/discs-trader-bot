import {Composer, Stage} from "telegraf";
import {BUY_GAMES_BUTTON_TEXT} from "../../constants";
import {buyGameScene} from "./scenes/buyGame";


export const buyGameCommandsComposer = new Composer();
const stage = new Stage([buyGameScene]);
buyGameCommandsComposer.use(stage.middleware());

buyGameCommandsComposer.hears(BUY_GAMES_BUTTON_TEXT, ctx => {
    // ctx.scene.enter('buyGameScene', {});
    ctx.scene.enter('buyGameScene',{});

})