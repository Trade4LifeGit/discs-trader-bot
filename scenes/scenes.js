import WizardScene from "telegraf/scenes/wizard"
import {cancelMenu, mainMenu} from "../keyboard/keyboard";
import {cancelButtonText, COST_VALIDATION_ERROR_MESSAGE} from "../constants/constants";

export const sellGameFromExploreScene = new WizardScene('sellGameFromExploreScene',
    (ctx) => {
        ctx.reply('Write down the cost of the game', cancelMenu);
        return ctx.wizard.next();
    },
    (ctx) => {
        let gameName = ctx.scene.state.gameName;
        let gameCost = ctx.message.text;
        if (!isNaN(+gameCost.trim().replace(",", "."))){
            ctx.reply(`The offer of selling "${gameName}" for ${gameCost} is published`, mainMenu);
        } else if (gameCost === cancelButtonText){
            ctx.reply('Canceled', mainMenu);
            return ctx.scene.leave();
        } else {
            ctx.reply(COST_VALIDATION_ERROR_MESSAGE);
            return;
        }
        return ctx.scene.leave();
    });
