import WizardScene from "telegraf/scenes/wizard"
import {cancelMenu, mainMenu} from "../keyboard/keyboard";
import {cancelButtonText} from "../constants/constants";

export const sellGameScene = new WizardScene('sellGameScene',
    (ctx) => {
        ctx.reply('Write down the cost of the game', cancelMenu);
        return ctx.wizard.next();
    },
    (ctx) => {
        let gameName = ctx.scene.state.gameName;
        let gameCost = ctx.message.text;
        if (parseFloat(gameCost.trim())){
            ctx.reply(`The offer of selling "${gameName}" for ${gameCost} is published`, mainMenu);
        } else if (gameCost === cancelButtonText){
            ctx.reply('Canceled', mainMenu);
            return ctx.scene.leave();
        } else {
            ctx.reply(costValidationErrorText);
            return;
        }
        return ctx.scene.leave();
    });