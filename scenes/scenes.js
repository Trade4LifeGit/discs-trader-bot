import WizardScene from "telegraf/scenes/wizard"
import {cancelMenu, exploreGame, mainMenu} from "../keyboard/keyboard";
import {cancelButtonText, GAMES_PAGE_SIZE, PSN_PLATFORM} from "../constants/constants";

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
            ctx.reply(`A value you entered is not a number! Please enter a valid value!`);
            return;
        }
        return ctx.scene.leave();
    });